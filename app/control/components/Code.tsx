import { useState } from "react";
import { Fieldset } from "./Fieldset";
import { doAction } from "@/app/actions/sdk";
import toast from "react-hot-toast";

const normalizeHex = (v: string) =>
  v.replace(/[^0-9a-fA-F]/g, "").toUpperCase();

const groupBytes = (hex: string) => hex.match(/.{1,2}/g)?.join(" ") ?? "";

const isValidFullBytes = (hex: string) =>
  hex.length > 0 && hex.length % 2 === 0;

export function Code() {
  const [raw, setRaw] = useState("");

  const normalized = normalizeHex(raw);
  const grouped = groupBytes(normalized);
  const valid = isValidFullBytes(normalized);

  const send = () => {
    if (!valid) {
      toast.error("Hex must be full bytes (pairs of 2)");
      return;
    }
    doAction(normalized);
    toast.success(`Sent ${grouped}`);
  };

  return (
    <Fieldset legend="Send raw hex command">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            autoFocus
            spellCheck={false}
            placeholder="Example: 01 7F FF"
            value={grouped}
            onChange={(e) => setRaw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className={`flex-1 rounded-md bg-white text-black p-2 font-mono outline-none transition
              ${
                valid || normalized.length === 0
                  ? "border-white"
                  : "border-red-500"
              }`}
          />

          <button
            type="button"
            onClick={send}
            disabled={!valid}
            className="rounded-md border px-4 py-2 font-medium transition
              disabled:opacity-40
              hover:bg-white hover:text-black"
          >
            Send
          </button>
        </div>

        <div className="text-xs opacity-70">
          Bytes are grouped automatically. Internal payload:{" "}
          <span className="font-mono">{normalized || "—"}</span>
        </div>
      </div>
    </Fieldset>
  );
}
