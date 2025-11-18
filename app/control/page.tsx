"use client";

import toast from "react-hot-toast";
import { doAction } from "@/app/actions/sdk";

enum Action {
  MOVE_FORWARD,
  MOVE_BACKWARD,
  STOP,
}

export default function Monitoring() {
  const handleAction = async (action) => {
    const response = await doAction(action);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div>
      <button
        className="px-3 py-2 bg-gradient-to-br from-pink-500/50 to-sky-500/50 rounded-full ring-white ring ring-inset"
        onClick={() => handleAction("backward")}
        type="button"
      >
        Forward
      </button>
      <button
        className="px-3 py-2 bg-gradient-to-br from-pink-500/50 to-sky-500/50 rounded-full ring-white ring ring-inset"
        onClick={() => handleAction("forward")}
        type="button"
      >
        Backward
      </button>
      <button
        className="px-3 py-2 bg-gradient-to-br from-pink-500/50 to-sky-500/50 rounded-full ring-white ring ring-inset"
        onClick={() => handleAction("left")}
        type="button"
      >
        Left
      </button>
      <button
        className="px-3 py-2 bg-gradient-to-br from-pink-500/50 to-sky-500/50 rounded-full ring-white ring ring-inset"
        onClick={() => handleAction("right")}
        type="button"
      >
        Right
      </button>
      <button
        className="px-3 py-2 bg-gradient-to-br from-pink-500/50 to-sky-500/50 rounded-full ring-white ring ring-inset"
        onClick={() => handleAction("stop")}
        type="button"
      >
        Stop
      </button>
    </div>
  );
}
