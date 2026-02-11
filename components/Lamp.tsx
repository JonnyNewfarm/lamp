"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function Lamp() {
  const { scene } = useGLTF("/lamp.glb");
  const [isMobileView, setIsMobileView] = useState(false);

  return (
    <group
      position={[isMobileView ? 1.6 : 0.2, isMobileView ? -1.6 : -1.35, -0.6]}
    >
      <primitive object={scene} scale={isMobileView ? 0.031 : 0.04} />
    </group>
  );
}
