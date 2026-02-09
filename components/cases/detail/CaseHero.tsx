"use client";

import Image from "next/image";

interface CaseHeroProps {
  name: string;
  image: string;
}

export function CaseHero({ name, image }: CaseHeroProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-48 h-48 md:w-[545px] flex items-center justify-center">
        <Image
          src={image || "/assets/case.png"}
          alt={name}
          width={368}
          height={212}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
        {name}
      </h1>
    </div>
  );
}
