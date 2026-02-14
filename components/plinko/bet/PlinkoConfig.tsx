"use client";

import React from "react";
import { PlinkoBetInput } from "./PlinkoBetInput";
import { PlinkoRiskSelect } from "./PlinkoRiskSelect";
import { PlinkoRowSelect } from "./PlinkoRowSelect";
import { PlinkoBallsSelect } from "./PlinkoBallsSelect";
import { PlinkoDropButton } from "./PlinkoDropButton";
import { PlinkoResult } from "./PlinkoResult";

export const PlinkoConfig = React.memo(() => {
  return (
    <div className="bg-background-card rounded-2xl w-full xl:w-[32%] h-fit">
      <div className="flex flex-col p-6 gap-6">
        <h2 className="text-2xl font-bold text-white">Plinko Configuration</h2>
        <PlinkoBetInput />
        <PlinkoRiskSelect />
        <PlinkoRowSelect />
        <PlinkoBallsSelect />
        <PlinkoDropButton />
        <PlinkoResult />
      </div>
    </div>
  );
});

PlinkoConfig.displayName = "PlinkoConfig";
