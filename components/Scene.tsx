"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Model from "./Model";

type ProductItem = {
  id: string;
  number: string;
  title: string;
  slug: string;
  category: string;
  image: string;
};

type SceneProps = {
  products: ProductItem[];
  activeMenu: number | null;
};

export default function Scene({ products, activeMenu }: SceneProps) {
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[10] h-screen w-screen"
    >
      {eventSource && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          eventSource={eventSource}
          eventPrefix="client"
          style={{
            pointerEvents: "none",
            touchAction: "auto",
          }}
          gl={{
            alpha: true,
            antialias: true,
          }}
        >
          <Model products={products} activeMenu={activeMenu} />
        </Canvas>
      )}
    </div>
  );
}
