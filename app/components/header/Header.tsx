"use client";
import { auth } from "@/app/actions/sdk";
import { NavElement } from "./NavElement";

export function Header() {
  const handleAuth = async () => {
    const code = prompt("Enter code:");

    auth(code || "");
  };
  return (
    <header className="p-5 flex justify-between items-center w-full border-b-2 md:border-none">
      <p className="font-extrabold text-2xl [txt-decoration:underline_overline] underline-offset-6 tracking-widest">
        LRIMa
      </p>
      <ul className="hidden md:flex gap-2 bg-white/10 border-white/20 border p-2 rounded-full">
        <NavElement href="/">Home</NavElement>
        <NavElement href="/monitoring">Monitoring</NavElement>
        <NavElement href="/control">Direct Control</NavElement>
        <NavElement href="/speech">Speech</NavElement>
      </ul>
      <button
        className="bg-white text-black rounded-full px-3 py-2"
        type="button"
        onClick={handleAuth}
      >
        Authenticate
      </button>
    </header>
  );
}
