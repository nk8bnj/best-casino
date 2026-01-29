"use client";

import React from "react";
import { PanelInputs } from "./PanelInputs";
import { PanelButtons } from "./PanelButtons";
import { PanelResult } from "./PanelResult";

export const PanelConfig = React.memo(() => {
  return (
    <div className="bg-background-card rounded-2xl w-full xl:w-[32%] h-fit">
      <div className="flex flex-col p-6 gap-8">
        <h2 className="text-2xl font-bold text-white">Crash Configuration</h2>
        <PanelInputs />
        <PanelButtons />
        <PanelResult />
      </div>
    </div>
  );
});

PanelConfig.displayName = "PanelConfig";
