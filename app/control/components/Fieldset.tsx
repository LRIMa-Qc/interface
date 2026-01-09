import { ReactNode } from "react";

export function Fieldset({
  legend,
  children,
}: {
  legend: ReactNode;
  children: ReactNode;
}) {
  return (
    <fieldset className="p-5 border border-white rounded-md">
      <legend className="bg-white/90 border-white text-black border p-2 rounded-full">
        {legend}
      </legend>

      {children}
    </fieldset>
  );
}
