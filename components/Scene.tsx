"use client";

import { Canvas } from "@react-three/fiber";
import { MutableRefObject } from "react";

import Model from "./Model";
import type { ProductItem } from "./NewProductsGallery";

type SceneProps = {
  products: ProductItem[];

  cardElementsRef: MutableRefObject<(HTMLDivElement | null)[]>;

  pointerRef: MutableRefObject<{
    x: number;
    y: number;
  }>;

  activeIndex: number | null;
};

export default function Scene({
  products,
  cardElementsRef,
  pointerRef,
  activeIndex,
}: SceneProps) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-10
        h-screen
        w-screen
      "
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{
          pointerEvents: "none",
          touchAction: "auto",
        }}
      >
        <Model
          products={products}
          cardElementsRef={cardElementsRef}
          pointerRef={pointerRef}
          activeIndex={activeIndex}
        />
      </Canvas>
    </div>
  );
}
