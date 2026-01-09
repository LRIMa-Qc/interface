import type {
  IClientOptions,
  OnConnectCallback,
  OnErrorCallback,
  OnMessageCallback,
} from "mqtt";
import mqtt from "mqtt";

const options = {
  host: "206.167.46.66",
  port: 1883,
  username: "dev",
  password: "lrimalrima",
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
