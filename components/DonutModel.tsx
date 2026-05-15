"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { GroupProps } from "@react-three/fiber";
import { Box3, Group, Mesh, Material, Vector3 } from "three";

interface DonutModelProps extends GroupProps {
  opacity?: number;
  src?: string;
}

const DEFAULT_SRC = "/models/donut.glb";

export default function DonutModel({ opacity, src = DEFAULT_SRC, ...props }: DonutModelProps) {
  const { scene } = useGLTF(src);

  const normalized = useMemo(() => {
    const inner = scene.clone(true);

    // normalize: fit largest axis to 1 unit, center at origin
    const box = new Box3().setFromObject(inner);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const max = Math.max(size.x, size.y, size.z) || 1;
    inner.position.sub(center);
    inner.scale.setScalar(1 / max);

    // wrap so position/rotation/scale on the outer group remain clean
    const wrapper = new Group();
    wrapper.add(inner);

    if (opacity !== undefined && opacity < 1) {
      wrapper.traverse((obj) => {
        const mesh = obj as Mesh;
        if (!mesh.isMesh) return;
        const apply = (mat: Material) => {
          const m = mat.clone();
          (m as Material & { transparent: boolean }).transparent = true;
          (m as Material & { opacity: number }).opacity = opacity;
          (m as Material & { depthWrite: boolean }).depthWrite = false;
          return m;
        };
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map(apply);
        } else if (mesh.material) {
          mesh.material = apply(mesh.material);
        }
      });
    }

    return wrapper;
  }, [scene, opacity]);

  return <primitive object={normalized} {...props} />;
}

useGLTF.preload("/models/donut.glb");
useGLTF.preload("/models/chocolateIcing.glb");
useGLTF.preload("/models/full_chocolate.glb");
useGLTF.preload("/models/oreo.glb");
useGLTF.preload("/models/strawberry.glb");
