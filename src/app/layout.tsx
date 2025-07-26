import type { Metadata } from "next";
import { Roboto_Serif, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Remorphable",
  description: "explore morphology by building your own words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${robotoSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
