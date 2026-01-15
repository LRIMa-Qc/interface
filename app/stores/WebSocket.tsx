"use client";
import { useEffect, useRef } from "react";
import {
  useAccelXStore,
  useAccelYStore,
  useAccelZStore,
  useGyroXStore,
  useGyroYStore,
  useGyroZStore,
  useMotor1Store,
  useMotor2Store,
} from "./store";

interface Data {
  type: string;
  value: number;
  timestamp: number;
}

export function WebSocketComponent() {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current) return;

    const ws = new WebSocket("wss://206.167.46.66:8001");
    wsRef.current = ws;

    ws.onopen = () => console.log("WS connected");
    ws.onclose = () => console.log("WS closed");
    ws.onerror = (err) => console.log("WS error", err);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as Data;

      console.log(data);

      switch (data.type) {
        case "device/01":
          useMotor1Store
            .getState()
            .addValue({ value: data.value, timestamp: Date.now() });
          break;
        case "device/02":
          useMotor2Store
            .getState()
            .addValue({ value: data.value, timestamp: Date.now() });
          break;
        case "device/03":
          useAccelXStore
            .getState()
            .addValue({ value: data.value, timestamp: Date.now() });
          break;
        case "device/04":
          useAccelYStore
            .getState()
            .addValue({ value: data.value, timestamp: Date.now() });
          break;
        case "device/05":
          useAccelZStore
            .getState()
            .addValue({ value: data.value, timestamp: Date.now() });
          break;
        case "device/06":
          useGyroXStore
            .getState()
            .addValue({ value: data.value, timestamp: Date.now() });
          break;
        case "device/07":
          useGyroYStore
            .getState()
            .addValue({ value: data.value, timestamp: Date.now() });
          break;
        case "device/08":
          useGyroZStore
            .getState()
            .addValue({ value: data.value, timestamp: Date.now() });
          break;
        default:
          break;
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  return null;
}
