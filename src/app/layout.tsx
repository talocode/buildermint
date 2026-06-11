import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "BuilderMint — Turn your skills into validated micro-SaaS ideas",
  description:
    "BuilderMint helps builders profile their skills, find demand signals, generate buildable opportunities, and turn the best idea into an MVP and launch plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}