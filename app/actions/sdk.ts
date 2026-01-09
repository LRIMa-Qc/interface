"use server";
import { cookies } from "next/headers";
import { client } from "./client";

enum Action {
  MOVE_FORWARD,
  MOVE_BACKWARD,
  STOP,
}

export async function toggleLED() {
  const store = await cookies();

  const code = store.get("code");

  if (!code) {
    return { success: false, message: "Unauthenticated" };
  }

  try {
    client.publish("bring/led", code.value);
    return { success: true, message: "Sent" };
  } catch {
    return { success: false, message: "Uknown error" };
  }
}

export async function doAction(action: string) {
  console.log(action);
  const store = await cookies();

  const code = store.get("code");

  if (!code) {
    return { success: false, message: "Unauthenticated" };
  }

  try {
    client.publish("device/write", action);
    return { success: true, message: "Sent" };
  } catch {
    return { success: false, message: "Uknown error" };
  }
}

export async function auth(code: string) {
  const store = await cookies();

  store.set("code", code);
}
