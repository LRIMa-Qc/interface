"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { doAction } from "@/app/actions/sdk";
import { Fieldset } from "./Fieldset";
import { DataWithHistory } from "@/app/stores/store";

export function MotorSpeed({
  motor,
  store,
}: {
  motor: string;
  store: (selector: (state: DataWithHistory) => number) => number;
}) {
  const rpm = store((state) => state.value);

  const [speed, setSpeed] = useState<number>(0);
  const changeMotorSpeed = async (percentage: number) => {
    setSpeed(percentage);
    const int16 = Math.round((percentage / 100) * 32767);
    let hex = (int16 & 0xffff).toString(16).toUpperCase();
    while (hex.length < 4) {
      hex = `0${hex}`;
    }

    const action = motor + hex;

    doAction(action);
  };

  const handleMotorSpeedChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const percentage =
      Math.max(-100, Math.min(100, parseInt(event.target.value, 10))) || 0;
    changeMotorSpeed(percentage);
  };

  return (
    <Fieldset
      legend={
        <>
          Motor {motor} (Speed: <span className="font-bold">{speed}</span> |
          RPM: <span className="font-bold">{rpm}</span>)
        </>
      }
    >
      <div className="flex items-center gap-2">
        <p>From slider: </p>
        <div className="flex items-center gap-2">
          <span>-100</span>
          <input
            type="range"
            min={-100}
            max={100}
            value={speed || 0}
            onChange={(e) => handleMotorSpeedChange(e, motor)}
          />
          <span>100</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>From input: </p>
        <div className="flex items-center gap-2">
          <input
            className="outline-none bg-white text-black text-center no-spinner"
            type="number"
            min={-100}
            max={100}
            value={speed || 0}
            onChange={(e) => handleMotorSpeedChange(e, motor)}
          />
        </div>
      </div>
      <div className="flex flex-cols items-center gap-2 py-1">
        <p>Quick actions: </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-white px-3 py-1 hover:bg-white hover:text-black"
            onClick={() => changeMotorSpeed(0)}
          >
            Stop
          </button>
        </div>
      </div>
    </Fieldset>
  );
}
