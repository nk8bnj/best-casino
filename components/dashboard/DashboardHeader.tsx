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
import { useAuthStore } from "@/store/auth.store";
import { useCurrentUser } from "@/hooks/api/useCurrentUser";

interface DashboardHeaderProps {
  balance?: string; // optional override
  avatarSrc?: string;
  onLogout?: () => void;
}

export function DashboardHeader({
  balance,
  avatarSrc,
  onLogout,
}: DashboardHeaderProps) {
  // Ensure current user is fetched and synced to auth store
  useCurrentUser();
  const openDrawer = useUIStore((state) => state.openDrawer);
  const user = useAuthStore((s) => s.user);
  // Normalize user balance into a separate variable so TypeScript can narrow null/undefined safely
  const userBalance = user?.balance ?? null;
  const displayBalance =
    balance ?? (userBalance !== null ? userBalance.toLocaleString() : "0.00");

  return (
    <header className="h-25 sticky-header px-4 md:px-6 xl:px-8 flex items-center justify-between">
      {/* Mobile: Hamburger | Tablet/Desktop: Logo */}
      <div className="flex items-center">
        {/* Hamburger - mobile only */}
        <button
          onClick={openDrawer}
          className="md:hidden touch-target flex items-center justify-center text-white hover:text-gray-300 transition-colors"
          aria-label="Open menu"
        >
          <HamburgerIcon className="w-6 h-6" />
        </button>

        {/* Logo - tablet and desktop */}
        <div className="hidden md:block">
          <Logo size="md" showText />
        </div>
      </div>

      {/* Balance - centered on mobile, part of right controls on tablet+ */}
      <div className="md:hidden absolute left-1/2 -translate-x-1/2">
        <BalanceDisplay balance={displayBalance} />
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 md:gap-3 xl:gap-4">
        <div className="hidden md:block">
          <BalanceDisplay balance={displayBalance} />
        </div>

        <button className="touch-target flex items-center justify-center">
          <UserAvatar src={avatarSrc} size="md" />
        </button>

        {/* Settings - desktop only */}
        <button
          className="hidden xl:flex touch-target items-center justify-center text-foreground cursor-pointer hover:text-white transition-colors ml-8"
          aria-label="Settings"
        >
          <SettingsIcon className="w-6 h-6" />
        </button>

        {/* Logout button - desktop only */}
        <button
          onClick={onLogout}
          className="hidden xl:flex items-center gap-2 bg-gradient-secondary text-white font-semibold py-2 px-5 rounded-full shadow-button hover:bg-gradient-secondary-hover active:bg-gradient-secondary-pressed active:shadow-button transition-all"
        >
          Log out
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
