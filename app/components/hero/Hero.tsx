"use client";
import { Canvas } from "@react-three/fiber";
import { RobotObj } from "./RobotObj";

export function Hero() {
  return (
    <div className="mt-16 w-screen">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-center inline-block bg-gradient-to-br from-sky-500 to-pink-400 bg-clip-text text-transparent">
          BRING
        </h1>
        <p className="text-lg font-medium px-5">
          Bot de Récupération Intelligent et de Navigation Guidé
        </p>
      </div>
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-500/20 to-pink-400/20 blur-3xl pointer-events-none" />
        <Canvas className="mx-auto w-96! h-96! relative">
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={10 * Math.PI}
          />
          <RobotObj />
        </Canvas>
      </div>
    </div>
  );
}
