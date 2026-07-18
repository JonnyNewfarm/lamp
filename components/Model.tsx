"use client";

import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import type { ProductItem } from "./NewProductsGallery";
import { fragment, vertex } from "./Shader";

type ModelProps = {
  products: ProductItem[];

  cardElementsRef: MutableRefObject<(HTMLDivElement | null)[]>;

  pointerRef: MutableRefObject<{
    x: number;
    y: number;
  }>;

  activeIndex: number | null;
};

type ProductPlaneProps = {
  index: number;
  texture: THREE.Texture;

  cardElementsRef: MutableRefObject<(HTMLDivElement | null)[]>;

  pointerRef: MutableRefObject<{
    x: number;
    y: number;
  }>;

  isActive: boolean;
};

function lerp(current: number, target: number, speed: number) {
  return current + (target - current) * speed;
}

function ProductPlane({
  index,
  texture,
  cardElementsRef,
  pointerRef,
  isActive,
}: ProductPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { viewport, size } = useThree();

  const previousPointerRef = useRef({
    x: pointerRef.current.x,
    y: pointerRef.current.y,
  });

  const velocityRef = useRef({
    x: 0,
    y: 0,
  });

  const strengthRef = useRef(0);

  const uniforms = useMemo(() => {
    texture.colorSpace = THREE.NoColorSpace;

    return {
      uTexture: {
        value: texture,
      },

      uVelocity: {
        value: new THREE.Vector2(0, 0),
      },

      uStrength: {
        value: 0,
      },
    };
  }, [texture]);

  useFrame(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    const element = cardElementsRef.current[index];

    if (!mesh || !material || !element) {
      if (mesh) {
        mesh.visible = false;
      }

      return;
    }

    const rect = element.getBoundingClientRect();

    const outsideViewport =
      rect.bottom <= 0 ||
      rect.top >= size.height ||
      rect.right <= 0 ||
      rect.left >= size.width;

    mesh.visible = !outsideViewport;

    if (outsideViewport) return;

    const pointerX = pointerRef.current.x;
    const pointerY = pointerRef.current.y;

    const rawVelocityX = pointerX - previousPointerRef.current.x;

    const rawVelocityY = pointerY - previousPointerRef.current.y;

    previousPointerRef.current.x = pointerX;
    previousPointerRef.current.y = pointerY;

    const targetVelocityX = isActive
      ? THREE.MathUtils.clamp(rawVelocityX, -50, 50)
      : 0;

    const targetVelocityY = isActive
      ? THREE.MathUtils.clamp(rawVelocityY, -50, 50)
      : 0;

    velocityRef.current.x = lerp(velocityRef.current.x, targetVelocityX, 0.08);

    velocityRef.current.y = lerp(velocityRef.current.y, targetVelocityY, 0.08);

    strengthRef.current = lerp(
      strengthRef.current,
      isActive ? 1 : 0,
      isActive ? 0.09 : 0.055,
    );

    material.uniforms.uVelocity.value.set(
      velocityRef.current.x,
      -velocityRef.current.y,
    );

    material.uniforms.uStrength.value = strengthRef.current;

    const pixelToWorldX = viewport.width / size.width;

    const pixelToWorldY = viewport.height / size.height;

    const worldWidth = rect.width * pixelToWorldX;

    const worldHeight = rect.height * pixelToWorldY;

    const worldX =
      -viewport.width / 2 + rect.left * pixelToWorldX + worldWidth / 2;

    const worldY =
      viewport.height / 2 - rect.top * pixelToWorldY - worldHeight / 2;

    mesh.position.set(worldX, worldY, index * 0.001);

    mesh.scale.set(worldWidth, worldHeight, 1);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 24, 24]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent={false}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Model({
  products,
  cardElementsRef,
  pointerRef,
  activeIndex,
}: ModelProps) {
  const imageUrls = useMemo(() => {
    return products.map((product) => product.image);
  }, [products]);

  const textures = useTexture(imageUrls) as THREE.Texture[];

  return (
    <>
      {products.map((product, index) => {
        const texture = textures[index];

        if (!texture) return null;

        return (
          <ProductPlane
            key={product.id}
            index={index}
            texture={texture}
            cardElementsRef={cardElementsRef}
            pointerRef={pointerRef}
            isActive={activeIndex === index}
          />
        );
      })}
    </>
  );
}
