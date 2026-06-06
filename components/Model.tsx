"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import * as THREE from "three";
import useMouse from "./UseMouse";
import useDimension from "./UseDimensions";
import { vertex, fragment } from "./Shader";

type ProductItem = {
  id: string;
  number: string;
  title: string;
  slug: string;
  category: string;
  image: string;
};

type ModelProps = {
  products: ProductItem[];
  activeMenu: number | null;
};

export default function Model({ products, activeMenu }: ModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { viewport } = useThree();
  const mouse = useMouse();
  const dimension = useDimension();

  const imageUrls = useMemo(() => {
    return products.map((product) => product.image);
  }, [products]);

  const textures = useTexture(imageUrls) as THREE.Texture[];

  const opacity = useRef(0);

  const smoothMouse = useRef({
    x: 0,
    y: 0,
  });

  const uniforms = useMemo(() => {
    return {
      uDelta: {
        value: new THREE.Vector2(0, 0),
      },
      uAmplitude: {
        value: 0.0005,
      },
      uTexture: {
        value: textures[0],
      },
      uAlpha: {
        value: 0,
      },
    };
  }, [textures]);

  const firstTexture = textures[0];

  const textureImage = firstTexture?.image as
    | HTMLImageElement
    | HTMLCanvasElement
    | ImageBitmap
    | undefined;

  const width = textureImage?.width ?? 1;
  const height = textureImage?.height ?? 1;

  const scale = useAspect(width, height, 0.225);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    });
  }, [textures]);

  useEffect(() => {
    if (!materialRef.current) return;

    if (activeMenu !== null && textures[activeMenu]) {
      materialRef.current.uniforms.uTexture.value = textures[activeMenu];
    }
  }, [activeMenu, textures]);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    const lerp = (start: number, end: number, amount: number) => {
      return start * (1 - amount) + end * amount;
    };

    const smoothX = smoothMouse.current.x;
    const smoothY = smoothMouse.current.y;

    smoothMouse.current.x = lerp(smoothX, mouse.x, 0.1);
    smoothMouse.current.y = lerp(smoothY, mouse.y, 0.1);

    const deltaX = mouse.x - smoothX;
    const deltaY = mouse.y - smoothY;

    materialRef.current.uniforms.uDelta.value.set(deltaX, -deltaY);

    const targetOpacity = activeMenu !== null ? 1 : 0;
    opacity.current = lerp(opacity.current, targetOpacity, 0.16);
    materialRef.current.uniforms.uAlpha.value = opacity.current;

    const x =
      (smoothMouse.current.x / dimension.width) * viewport.width -
      viewport.width / 2;

    const y =
      viewport.height / 2 -
      (smoothMouse.current.y / dimension.height) * viewport.height;

    meshRef.current.position.x = x;
    meshRef.current.position.y = y;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[1, 1.6, 15, 15]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
