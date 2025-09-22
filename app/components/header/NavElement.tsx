"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavElementProps {
  children: string;
  href: string;
}

export function NavElement({ children, href }: NavElementProps) {
  const isActive = usePathname().endsWith(href);
  return (
    <li className="">
      <Link
        className={`px-3 py-2 inline-block rounded-full ${isActive ? "bg-gradient-to-br from-indigo-500 to-violet-500" : "hover:bg-indigo-200/20"}`}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
