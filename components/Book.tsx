import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
  LinearFilter,
  LinearMipMapLinearFilter,
  type Group,
  type Texture,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pageAtom, pages } from "./UI";

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2,
);
pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const positionAttr = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let i = 0; i < positionAttr.count; i++) {
  vertex.fromBufferAttribute(positionAttr, i);
  const x = vertex.x;

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4),
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4),
);

const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

const pageMaterialsBase: MeshStandardMaterial[] = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#111" }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

pages.forEach((p) => {
  useTexture.preload(`/textures/${p.front}.jpg`);
  useTexture.preload(`/textures/${p.back}.jpg`);
});

type PageData = (typeof pages)[number];
type GroupElementProps = ThreeElements["group"];

type PageProps = GroupElementProps &
  PageData & {
    number: number;
    page: number;
    opened: boolean;
    bookClosed: boolean;
  };

type BookProps = GroupElementProps;

const Page: React.FC<PageProps> = ({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  ...props
}) => {
  const textures = useTexture([
    `/textures/${front}.jpg`,
    `/textures/${back}.jpg`,
    ...(number === 0 || number === pages.length - 1 ? [] : []),
  ]) as Texture[];

  const picture = textures[0]!;
  const picture2 = textures[1]!;
  const pictureRoughness = textures[2];

  picture.colorSpace = SRGBColorSpace;
  picture2.colorSpace = SRGBColorSpace;

  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

    [picture, picture2].forEach((texture) => {
      texture.anisotropy = maxAnisotropy;
      texture.generateMipmaps = true;
      texture.minFilter = LinearMipMapLinearFilter;
      texture.magFilter = LinearFilter;
      texture.needsUpdate = true;
    });
  }, [gl, picture, picture2]);

  const group = useRef<Group>(null);
  const turnedAt = useRef<number>(0);
  const lastOpened = useRef<boolean>(opened);

  const skinnedMeshRef =
    useRef<SkinnedMesh<BoxGeometry, MeshStandardMaterial[]>>(null);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new Bone();
      bones.push(bone);
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
      if (i > 0) bones[i - 1]!.add(bone);
    }

    const skeleton = new Skeleton(bones);

    const frontMat = new MeshStandardMaterial({
      color: whiteColor,
      map: picture,
      ...(number === 0 && pictureRoughness
        ? { roughnessMap: pictureRoughness }
        : { roughness: 0.1 }),
      emissive: emissiveColor,
      emissiveIntensity: 0,
    });

    const backMat = new MeshStandardMaterial({
      color: whiteColor,
      map: picture2,
      ...(number === pages.length - 1 && pictureRoughness
        ? { roughnessMap: pictureRoughness }
        : { roughness: 0.1 }),
      emissive: emissiveColor,
      emissiveIntensity: 0,
    });

    const materials: MeshStandardMaterial[] = [
      ...pageMaterialsBase,
      frontMat,
      backMat,
    ];

    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]!);
    mesh.bind(skeleton);

    return mesh;
  }, [number, picture, picture2, pictureRoughness]);

  useFrame((_, delta) => {
    const mesh = skinnedMeshRef.current;
    const grp = group.current;
    if (!mesh || !grp) return;

    if (lastOpened.current !== opened) {
      turnedAt.current = Date.now();
      lastOpened.current = opened;
    }

    let turningTime = Math.min(400, Date.now() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) targetRotation += degToRad(number * 0.8);

    const bones = mesh.skeleton.bones;

    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? grp : bones[i]!;

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;

      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;

      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }

      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        easingFactor,
        delta,
      );

      const foldIntensity =
        i > 8
          ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
          : 0;

      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta,
      );
    }
  });

  return (
    <group {...props} ref={group} raycast={null as any}>
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
};

export const Book: React.FC<BookProps> = (props) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState<number>(page);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const goToPage = () => {
      setDelayedPage((current) => {
        if (page === current) return current;

        timeout = setTimeout(goToPage, Math.abs(page - current) > 2 ? 50 : 150);

        return page > current ? current + 1 : current - 1;
      });
    };

    goToPage();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [page]);

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {pages.map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          {...pageData}
        />
      ))}
    </group>
  );
};
