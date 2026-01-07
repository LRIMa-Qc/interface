"use client";
import { useFormStatus } from "react-dom";

export function Answer() {
  const { pending, data, method, action } = useFormStatus();
  console.log(data);
  return (
    <div>
      <p>{pending ? "Wait" : JSON.stringify(data)}</p>
    </div>
  );
}
