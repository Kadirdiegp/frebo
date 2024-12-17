import type { Metadata } from "next";
import { ClientProviders } from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photography Portfolio",
  description: "A beautiful photography portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
