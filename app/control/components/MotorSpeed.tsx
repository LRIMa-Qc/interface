"use client";

import { useState, type ChangeEvent } from "react";
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

  const [speed, setSpeed] = useState(0);
  const [lastSent, setLastSent] = useState(0);

  const clamp = (v: number) => Math.max(-100, Math.min(100, v));

  const sendMotorSpeed = (percentage: number) => {
    const int16 = Math.round((percentage / 100) * 32767);
    const hex = (int16 & 0xffff)
      .toString(16)
      .toUpperCase()
      .padStart(4, "0");

    doAction(motor + hex);
    setLastSent(percentage);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") return;
    setSpeed(clamp(Number(v)));
  };

  const adjust = (delta: number) => {
    setSpeed((s) => clamp(s + delta));
  };

  const dirty = speed !== lastSent;

  return (
    <Fieldset
      legend={
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold">Motor {motor}</span>
          <span className="text-sm opacity-80">
            Target: {speed}% · RPM: {rpm}
          </span>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <label className="w-20 text-sm">Speed</label>
          <input
            type="range"
            min={-100}
            max={100}
            value={speed}
            onChange={handleChange}
            className="flex-1"
          />
          <input
            type="number"
            min={-100}
            max={100}
            value={speed}
            onChange={handleChange}
            className="w-20 text-center bg-white text-black rounded-md"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[-100, -50, 0, 50, 100].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setSpeed(v)}
              className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
            >
              {v > 0 ? `+${v}` : v}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => adjust(-5)}>−5</button>
          <button onClick={() => adjust(-1)}>−1</button>
          <button onClick={() => adjust(1)}>+1</button>
          <button onClick={() => adjust(5)}>+5</button>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-sm opacity-70">
            {dirty ? "Unsaved change" : "Last command sent"}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={!dirty}
              onClick={() => sendMotorSpeed(speed)}
              className="rounded-md bg-blue-600 px-4 py-1 text-white disabled:opacity-40"
            >
              Send
            </button>

            <button
              type="button"
              onClick={() => {
                setSpeed(0);
                sendMotorSpeed(0);
              }}
              className="rounded-md border px-4 py-1"
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </Fieldset>
  );
}

