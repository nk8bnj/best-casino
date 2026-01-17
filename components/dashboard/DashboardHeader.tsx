"use client";

import { Logo } from "@/components/ui";
import {
  HamburgerIcon,
  SettingsIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { useUIStore } from "@/store/ui.store";
import { BalanceDisplay } from "./BalanceDisplay";
import { UserAvatar } from "./UserAvatar";

interface DashboardHeaderProps {
  balance?: string;
  avatarSrc?: string;
  onLogout?: () => void;
}

export function DashboardHeader({
  balance = "10.000",
  avatarSrc,
  onLogout,
}: DashboardHeaderProps) {
  const openDrawer = useUIStore((state) => state.openDrawer);

  return (
    <header className="h-25 sticky-header px-4 lg:px-8 flex items-center justify-between">
      {/* Mobile: Hamburger | Desktop: Logo */}
      <div className="flex items-center">
        {/* Hamburger - mobile only */}
        <button
          onClick={openDrawer}
          className="lg:hidden touch-target flex items-center justify-center text-white hover:text-gray-300 transition-colors"
          aria-label="Open menu"
        >
          <HamburgerIcon className="w-6 h-6" />
        </button>

        {/* Logo - desktop only */}
        <div className="hidden lg:block">
          <Logo size="md" showText />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 lg:gap-4">
        <BalanceDisplay balance={balance} />

        <button className="touch-target flex items-center justify-center">
          <UserAvatar src={avatarSrc} size="md" />
        </button>

        {/* Settings - desktop only */}
        <button
          className="hidden lg:flex touch-target items-center justify-center text-foreground cursor-pointer hover:text-white transition-colors ml-8"
          aria-label="Settings"
        >
          <SettingsIcon className="w-6 h-6" />
        </button>

        {/* Logout button - desktop only */}
        <button
          onClick={onLogout}
          className="hidden lg:flex items-center gap-2 bg-gradient-secondary text-white font-semibold py-2 px-5 rounded-full shadow-button hover:bg-gradient-secondary-hover active:bg-gradient-secondary-pressed active:shadow-button transition-all"
        >
          Log out
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
