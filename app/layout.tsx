import "./globals.css";
import { getFontVariables } from "@/config/fonts";

export { metadata } from "@/config/metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${getFontVariables()} antialiased`}>{children}</body>
    </html>
  );
}
