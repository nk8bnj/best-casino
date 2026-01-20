import Image from "next/image";

export function CoinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <Image
      src="/assets/coin.svg"
      alt="Coin"
      width={20}
      height={20}
      className={className}
    />
  );
}
