// mqttClient.ts
"use client";
import mqtt, { MqttClient, IClientOptions } from "mqtt";

const options = {
  host: "0fa1404b7c15491b90830564ce2ee08e.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "hivemq.webclient.1762814726293",
  password: ":X7x@1C20*MBrO.fHmds",
} satisfies IClientOptions;

export function getMqttClient(): MqttClient {
  const client = mqtt.connect(options);

  client.on("connect", () => console.log("MQTT connected"));
  client.on("error", (err) => console.error("MQTT error", err));
  client.on("close", () => console.log("MQTT disconnected"));

  return client;
}
