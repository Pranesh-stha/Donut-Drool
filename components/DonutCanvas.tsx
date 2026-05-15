"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import DonutScene from "./DonutScene";

export default function DonutCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, 3]} intensity={0.4} />
      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <DonutScene />
      </Suspense>
    </Canvas>
  );
}
