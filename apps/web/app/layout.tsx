import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Provider from "../components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clikz - Your team's link management",
  description: "Link management and branding for teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
