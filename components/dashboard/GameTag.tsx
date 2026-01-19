"use client";

interface GameTagProps {
  tag: "top" | "popular" | "hot" | "new";
}

export function GameTag({ tag }: GameTagProps) {
  const tagConfig = {
    top: {
      label: "Top",
      className: "text-black",
    },
    popular: {
      label: "Popular",
      className: "text-black",
    },
    hot: {
      label: "Hot",
      className: "text-black",
    },
    new: {
      label: "New",
      className: "text-black",
    },
  };

  const config = tagConfig[tag];

  return (
    <span
      className={`inline-block px-3 py-1 text-xs text-white font-semibold rounded-full ${config.className}`}
      style={{
        background:
          "linear-gradient(116.24deg, #B9FF58 -6.88%, #69B400 83.61%)",
        boxShadow: "0px 0px 16px 0px #A7E84D",
      }}
    >
      {config.label}
    </span>
  );
}
