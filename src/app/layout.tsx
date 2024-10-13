import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="stylesheet" href="./globals.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
