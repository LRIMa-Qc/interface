"use client";

import { MotorSpeed } from "./components/MotorSpeed";
import { IMUActiviation } from "./components/IMUActivation";
import { useMotor1Store, useMotor2Store } from "../stores/store";
import { Code } from "./components/Code";

export default function Monitoring() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <MotorSpeed motor="01" store={useMotor1Store} />
      <MotorSpeed motor="02" store={useMotor2Store} />
      <IMUActiviation />
      <Code />
    </div>
  );
}
