import { useState } from "react";
import { Fieldset } from "./Fieldset";
import { doAction } from "@/app/actions/sdk";

export function IMUActiviation() {
  const [on, setOn] = useState<boolean | null>(null);
  const changeIMUState = (state: boolean) => {
    setOn(state);

    if (state) {
      doAction("0701");
    } else {
      doAction("0700");
    }
  };

  return (
    <Fieldset
      legend={
        <p>IMU ({on === null ? "Unkonwn" : on ? "Enabled" : "Disabled"})</p>
      }
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-md border border-white px-3 py-2 hover:bg-white hover:text-black"
          onClick={() => changeIMUState(true)}
        >
          Enable
        </button>
        <button
          type="button"
          className="rounded-md border border-white px-3 py-2 hover:bg-white hover:text-black"
          onClick={() => changeIMUState(false)}
        >
          Disable
        </button>
      </div>
    </Fieldset>
  );
}
