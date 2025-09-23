/** biome-ignore-all lint/suspicious/noAssignInExpressions: <explanation> */
"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function RobotObj(props: any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_, delta) => (meshRef.current.rotation.y += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <Idk>
    <mesh
      {...props}
      ref={meshRef}
      scale={1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onAfterRender={(_) => (meshRef.current.rotation.x = 10)}
    >
      <boxGeometry args={[4, 1.5, 4]} />
      <meshStandardMaterial color={hovered ? "skyblue" : "white"} />
    </mesh>
  );
}
