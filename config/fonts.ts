import { Inter, Manrope } from "next/font/google";
import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    {
      path: "../app/fonts/Satoshi-Variable.woff2",
      style: "normal",
      weight: "500 900",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Utility to get all font variables as className string
export const getFontVariables = () => {
  return `${satoshi.variable} ${inter.variable} ${manrope.variable}`;
};
