import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContentPilot AI",
  description: "研究与策略工作区"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
