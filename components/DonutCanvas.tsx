"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import DonutScene from "./DonutScene";

function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsPortrait(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isPortrait;
}

export default function DonutCanvas() {
  const isPortrait = useIsPortrait();

  return (
    <Canvas
      key={isPortrait ? "portrait" : "landscape"}
      camera={{
        position: [0, 0, isPortrait ? 9 : 8],
        fov: isPortrait ? 60 : 45,
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={isPortrait ? [1, 1.5] : [1, 2]}
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
