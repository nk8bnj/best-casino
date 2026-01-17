"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/ui.store";
import { Logo } from "@/components/ui";
import {
  CloseIcon,
  InventoryIcon,
  SettingsIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { DrawerMenuItem } from "./DrawerMenuItem";

export function SideDrawer() {
  const { isDrawerOpen, closeDrawer } = useUIStore();

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="absolute left-0 top-0 h-full w-[var(--drawer-width)] bg-[#0f0c29] shadow-2xl flex flex-col animate-slide-in"
        style={{
          animation: "slideIn 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Logo size="md" showText />
          <button
            onClick={closeDrawer}
            className="touch-target flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4">
          <DrawerMenuItem
            icon={<InventoryIcon className="w-5 h-5" />}
            label="Inventory"
            onClick={closeDrawer}
          />
          <DrawerMenuItem
            icon={<SettingsIcon className="w-5 h-5" />}
            label="Settings"
            onClick={closeDrawer}
          />
        </nav>

        {/* Footer */}
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-secondary text-white font-semibold py-3 px-6 rounded-full shadow-button hover:bg-gradient-secondary-hover active:bg-gradient-secondary-pressed active:shadow-button transition-all">
            Log out
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
