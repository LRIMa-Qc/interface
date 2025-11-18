import type {
  IClientOptions,
  OnConnectCallback,
  OnErrorCallback,
  OnMessageCallback,
} from "mqtt";
import mqtt from "mqtt";

const options = {
  host: "0fa1404b7c15491b90830564ce2ee08e.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "hivemq.webclient.1762814726293",
  password: ":X7x@1C20*MBrO.fHmds",
} satisfies IClientOptions;

export const client = mqtt.connect(options);

const onConnect: OnConnectCallback = async (e) => {
  console.log("Connected");
};

const onError: OnErrorCallback = async (e) => {
  console.error(e);
};

const onMessage: OnMessageCallback = async (topic, message) => {
  const value = parseFloat(message.toString());
  console.log(topic, value);
};

client.on("connect", onConnect);
client.on("error", onError);
