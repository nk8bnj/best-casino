import "./globals.css";
import { getFontVariables } from "@/config/fonts";
import { QueryProvider } from "@/providers/QueryProvider";

export { metadata } from "@/config/metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${getFontVariables()} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
