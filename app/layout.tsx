import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catch! — Settle the trip. Pay the crew.",
  description: "Simple commercial fishing settlement software for fleets, boat owners, captains, and crews.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
