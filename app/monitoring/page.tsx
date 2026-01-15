"use client";

import {
  useAccelXStore,
  useAccelYStore,
  useAccelZStore,
  useGyroXStore,
  useGyroYStore,
  useGyroZStore,
  useMotor1Store,
  useMotor2Store,
} from "../stores/store";
import CameraFeed from "./CameraFeed";
import RealTimeChart from "./RealtimeChart";

export default function Monitoring() {
  return (
    <div className="grid grid-cols-2 gap-10 w-full h-full overflow-y-auto pb-32">
      <RealTimeChart
        store={useMotor1Store}
        chartId="motor1"
        title="RPM: Motor 1"
      />
      <RealTimeChart
        store={useMotor2Store}
        chartId="motor2"
        title="RPM: Motor 2"
      />
      <RealTimeChart
        store={useAccelXStore}
        chartId="accelX"
        title="Acceleration (x)"
      />
      <RealTimeChart
        store={useAccelYStore}
        chartId="accelY"
        title="Acceleration (y)"
      />
      <RealTimeChart
        store={useAccelZStore}
        chartId="accelZ"
        title="Acceleration (z)"
      />
      <RealTimeChart store={useGyroXStore} chartId="gyroX" title="Gyro (x)" />
      <RealTimeChart store={useGyroYStore} chartId="gyroY" title="Gyro (y)" />
      <RealTimeChart store={useGyroZStore} chartId="gyroZ" title="Gyro (z)" />
      <CameraFeed />
    </div>
  );
}
