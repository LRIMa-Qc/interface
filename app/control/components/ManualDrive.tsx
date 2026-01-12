"use client";

import { useEffect, useRef, useState } from "react";
import { doAction } from "@/app/actions/sdk";
import { Fieldset } from "./Fieldset";
import {
  DataWithHistory,
  useMotor1Store,
  useMotor2Store,
} from "@/app/stores/store";

export function ManualDrive() {
  const rpm1 = useMotor1Store((state) => state.value);
  const rpm2 = useMotor2Store((state) => state.value);

  const [basePower, setBasePower] = useState<number>(0);
  const [isSyncEnabled, setIsSyncEnabled] = useState<boolean>(false);
  const [kp, setKp] = useState(0.02);

  const lastSyncTime = useRef(Date.now());
  const correction = useRef(0);
  const lastSentM1 = useRef<number | null>(null);
  const lastSentM2 = useRef<number | null>(null);
  const hasInteracted = useRef(false);

  const sendCommand = (motorId: string, power: number) => {
    if (!hasInteracted.current) return;

    const clamped = Math.round(Math.max(-100, Math.min(100, power)));
    if (motorId === "01" && lastSentM1.current === clamped) return;
    if (motorId === "02" && lastSentM2.current === clamped) return;

    if (motorId === "01") lastSentM1.current = clamped;
    if (motorId === "02") lastSentM2.current = clamped;

    const int16 = Math.round((clamped / 100) * 32767);
    const hex = (int16 & 0xffff).toString(16).toUpperCase().padStart(4, "0");
    doAction(motorId + hex);
  };

  useEffect(() => {
    if (!hasInteracted.current) return;

    const now = Date.now();
    const dt = (now - lastSyncTime.current) / 1000;
    lastSyncTime.current = now;

    if (!isSyncEnabled) {
      correction.current = 0;
      sendCommand("01", 0);
      sendCommand("02", 0);
      return;
    }

    if (basePower === 0) {
      correction.current = 0;
      sendCommand("01", 0);
      sendCommand("02", 0);
      return;
    }

    if (dt > 0 && dt < 1) {
      // INVERSE SYNC LOGIC:
      // We want rpm1 to equal -rpm2.
      // The error is the difference between the target inverse and reality.
      const error = -rpm2 - rpm1;

      if (Math.abs(error) > 5) {
        correction.current += error * kp * dt;
        correction.current = Math.max(-25, Math.min(25, correction.current));
      }

      // M1 gets forward power, M2 gets inverse power
      sendCommand("01", basePower + correction.current);
      sendCommand("02", -basePower - correction.current);
    }
  }, [rpm1, rpm2, isSyncEnabled, basePower, kp]);

  return (
    <Fieldset legend="Inverse Motor Controller">
      <div className="flex flex-col gap-6 p-4">
        {/* Header with Inverse Mode Toggle */}
        <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
          <div className="flex flex-col">
            <span className="text-[10px] text-orange-500 uppercase font-bold tracking-widest">
              Inverse Mode
            </span>
            <span
              className={`text-sm font-black ${isSyncEnabled ? "text-white" : "text-zinc-600"}`}
            >
              {isSyncEnabled ? "ACTIVE (M1 = -M2)" : "SYSTEM IDLE"}
            </span>
          </div>
          <button
            onClick={() => {
              hasInteracted.current = true;
              setIsSyncEnabled(!isSyncEnabled);
            }}
            className={`px-8 py-3 rounded-lg font-bold transition-all shadow-md ${
              isSyncEnabled
                ? "bg-orange-600 text-white"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {isSyncEnabled ? "DISENGAGE" : "ENGAGE"}
          </button>
        </div>

        {/* RPM Displays (M2 is highlighted as Inverse) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-black rounded-lg border border-zinc-800 text-center">
            <p className="text-[10px] text-zinc-500 uppercase">M1 RPM</p>
            <p
              className={`text-2xl font-mono ${isSyncEnabled ? "text-blue-400" : "text-zinc-700"}`}
            >
              {rpm1}
            </p>
          </div>
          <div className="p-3 bg-black rounded-lg border border-zinc-800 text-center relative">
            <p className="text-[10px] text-orange-500 uppercase">
              M2 RPM (Inv)
            </p>
            <p
              className={`text-2xl font-mono ${isSyncEnabled ? "text-orange-400" : "text-zinc-700"}`}
            >
              {rpm2}
            </p>
            <span className="absolute top-1 right-2 text-[8px] text-zinc-600 italic">
              Target: {-rpm1}
            </span>
          </div>
        </div>

        {/* Master Power Slider */}
        <div
          className={`space-y-2 ${!isSyncEnabled ? "opacity-40 pointer-events-none" : ""}`}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Inverse Speed</span>
            <span className="text-3xl font-black text-orange-500">
              {basePower}%
            </span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={basePower}
            onChange={(e) => {
              hasInteracted.current = true;
              setBasePower(Number(e.target.value));
            }}
            className="w-full h-3 bg-zinc-800 rounded-lg appearance-none accent-orange-500 cursor-pointer"
          />
        </div>

        {isSyncEnabled && (
          <div className="text-center text-[10px] text-zinc-500 font-mono">
            Correction applied: {correction.current.toFixed(2)}%
          </div>
        )}
      </div>
    </Fieldset>
  );
}
