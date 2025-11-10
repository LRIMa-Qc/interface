/** biome-ignore-all lint/suspicious/noAssignInExpressions: <explanation> */
"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import type { Mesh } from "three";
import { STLLoader } from "three/examples/jsm/Addons.js";
import { useGesture } from "@use-gesture/react";

function toRad(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function RobotObj(props: any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    // meshRef.current.rotation.y = state.mouse.x * Math.PI;
    meshRef.current.rotation.y += 0.1 * delta;
  });
  const geometry = useLoader(STLLoader, "./robot.STL");

  geometry.computeBoundingBox();
  const center = new THREE.Vector3();
  geometry?.boundingBox?.getCenter(center);
  geometry.center();

  useGesture(
    {
      onDrag: ({ delta: [dx, dy] }) => {
        meshRef.current.rotation.y += dx * 0.01;
        meshRef.current.rotation.x += dy * 0.01;
      },
    },
    { target: typeof window !== "undefined" ? window : undefined },
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <Idk>
    <mesh
      {...props}
      ref={meshRef}
      geometry={geometry}
      scale={0.01}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      // onAfterRender={(_) => (meshRef.current.rotation.x = 10)}
    >
      {/* <primitive object={stl} /> */}
      <meshStandardMaterial
        transparent
        opacity={0.8}
        color={hovered ? "#a591d7" : "white"}
      />
    </mesh>
  );
}
