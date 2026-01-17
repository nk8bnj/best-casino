"use client";

import type { ReactNode } from "react";

interface DrawerMenuItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export function DrawerMenuItem({ icon, label, onClick }: DrawerMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3 text-white hover:bg-white/10 transition-colors rounded-lg touch-target"
    >
      <span className="text-gray-400">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
