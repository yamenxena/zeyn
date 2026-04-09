import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zeyn - Marvel Metaverse Intelligence",
  description: "Deep zoom visualization of the Marvel Multiverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
