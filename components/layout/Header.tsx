"use client";

import { usePathname } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const ALLOWED_PREFIXES = ["/dashboard", "/crash-game", "/games", "/game"];

export function Header() {
  const pathname = usePathname();

  if (!pathname) return null;

  const shouldShow = ALLOWED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (!shouldShow) return null;

  return <DashboardHeader />;
}
