"use client";

import toast from "react-hot-toast";
import { doAction } from "@/app/actions/sdk";
import { ChangeEvent } from "react";
import { MotorSpeed } from "./components/MotorSpeed";
import { Fieldset } from "./components/Fieldset";
import { IMUActiviation } from "./components/IMUActivation";
import { useMotor1Store, useMotor2Store } from "../stores/store";

export default function Monitoring() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <MotorSpeed motor="01" store={useMotor1Store} />
      <MotorSpeed motor="02" store={useMotor2Store} />
      <IMUActiviation />
    </div>
  );
}
