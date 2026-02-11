import {
  Environment,
  Float,
  OrbitControls,
  ScrollControls,
} from "@react-three/drei";
import { Book } from "./Book";
import { ScrollSync } from "./ScrollControls";
import { pages } from "./UI";
import { ResetOnMount } from "./ResetOnMount";

export const Experience = () => {
  const totalStops = pages.length + 1;

  return (
    <>
      <ScrollControls pages={totalStops} damping={0.15}>
        <ResetOnMount />
        <ScrollSync totalStops={totalStops} />

        <Float
          rotation-x={-Math.PI / 4}
          floatIntensity={0.4}
          speed={2}
          rotationIntensity={1}
        >
          <group position-x={-0.3}>
            <Book />
          </group>
        </Float>
      </ScrollControls>

      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />
      <Environment preset="studio" />

      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
    </>
  );
};
