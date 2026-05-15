"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import DonutModel from "./DonutModel";

type DonutPose = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  src: string;
};

const LEAD_SRC = "/models/donut.glb";
const FLAVORS = [
  "/models/chocolateIcing.glb",
  "/models/full_chocolate.glb",
  "/models/oreo.glb",
  "/models/strawberry.glb",
  "/models/donut.glb",
  "/models/custard.glb",
  "/models/whiteIcing.glb"
];

const ZOOM_DURATION = 2.0;
const ZOOM_START_Z = -8;
const ZOOM_END_Z = 4;
const ZOOM_START_SCALE = 0.4;
const ZOOM_END_SCALE = 2.4;
const ZOOM_END_X_TILT = Math.PI / 2;

const BURST_DURATION = 2.05;
const BURST_START_POSITION: [number, number, number] = [0, 0, ZOOM_END_Z];
const BURST_START_ROTATION: [number, number, number] = [ZOOM_END_X_TILT, 0, 0];

const BURST_DONUTS: DonutPose[] = [
  {
    position: [-2.35, 0.15, 4.05],
    rotation: [Math.PI / 2 - 0.25, 0.6, -0.35],
    scale: 2.35,
    src: FLAVORS[5],
  },
  {
    position: [2.35, -0.05, 4.0],
    rotation: [Math.PI / 2 - 0.16, -0.22, 0.12],
    scale: 2.35,
    src: FLAVORS[4],
  },
  {
    position: [-3.45, 1.75, 1.7],
    rotation: [Math.PI / 2 - 0.45, 0.35, -0.55],
    scale: 1.15,
    src: FLAVORS[0],
  },
  {
    position: [2.45, 1.8, 2.15],
    rotation: [Math.PI / 2 - 0.32, -0.65, 0.4],
    scale: 1.45,
    src: FLAVORS[3],
  },
  {
    position: [-2.6, -1.55, 2.1],
    rotation: [Math.PI / 2 - 0.1, 0.2, 0.5],
    scale: 1.45,
    src: FLAVORS[6],
  },
  {
    position: [1.7, -1.95, 1.85],
    rotation: [Math.PI / 2 - 0.28, -0.4, -0.35],
    scale: 1.3,
    src: FLAVORS[0],
  },
  {
    position: [3.95, 0.85, 1.1],
    rotation: [Math.PI / 2 - 0.5, -0.85, 0.2],
    scale: 0.95,
    src: FLAVORS[3],
  },
  {
    position: [0.05, -2.55, 0.85],
    rotation: [Math.PI / 2 - 0.55, 0.1, -0.1],
    scale: 0.75,
    src: FLAVORS[2],
  },
];

const easeInCubic = (t: number) => t * t * t;
const easeBurstSettle = (t: number) => 1 - Math.pow(1 - t, 5.2);
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function DonutScene() {
  const mainRef = useRef<Group>(null);
  const burstRefs = useRef<(Group | null)[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useFrame((state) => {
    const main = mainRef.current;
    if (!main) return;
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTimeRef.current;

    if (elapsed < ZOOM_DURATION) {
      const t = elapsed / ZOOM_DURATION;
      const e = easeInCubic(t);

      main.position.set(0, 0, lerp(ZOOM_START_Z, ZOOM_END_Z, e));
      main.scale.setScalar(lerp(ZOOM_START_SCALE, ZOOM_END_SCALE, e));
      main.rotation.set(e * ZOOM_END_X_TILT, 0, 0);

      burstRefs.current.forEach((donut) => donut?.scale.setScalar(0));
    } else if (elapsed < ZOOM_DURATION + BURST_DURATION) {
      main.scale.setScalar(0);

      const t = (elapsed - ZOOM_DURATION) / BURST_DURATION;
      const clampedT = clamp01(t);
      const e = easeBurstSettle(clampedT);

      BURST_DONUTS.forEach((pose, index) => {
        const donut = burstRefs.current[index];
        if (!donut) return;

        donut.position.set(
          lerp(BURST_START_POSITION[0], pose.position[0], e),
          lerp(BURST_START_POSITION[1], pose.position[1], e),
          lerp(BURST_START_POSITION[2], pose.position[2], e)
        );
        donut.scale.setScalar(lerp(ZOOM_END_SCALE, pose.scale, e));
        donut.rotation.set(
          lerp(BURST_START_ROTATION[0], pose.rotation[0], e),
          lerp(BURST_START_ROTATION[1], pose.rotation[1], e),
          lerp(BURST_START_ROTATION[2], pose.rotation[2], e)
        );
      });
    } else {
      main.scale.setScalar(0);

      BURST_DONUTS.forEach((pose, index) => {
        const donut = burstRefs.current[index];
        if (!donut) return;

        donut.position.set(...pose.position);
        donut.scale.setScalar(pose.scale);
        donut.rotation.set(...pose.rotation);
      });
    }
  });

  return (
    <>
      <group ref={mainRef}>
        <DonutModel src={LEAD_SRC} />
      </group>
      {BURST_DONUTS.map((pose, index) => (
        <group
          key={index}
          ref={(node) => {
            burstRefs.current[index] = node;
          }}
        >
          <DonutModel src={pose.src} />
        </group>
      ))}
    </>
  );
}
