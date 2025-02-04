import { Inter } from "next/font/google";

import TailwindSizeUtil from "@clikz/ui/components/tailwind-size-util";
import "@clikz/ui/globals.css";

import { constructMetaTags } from "~/lib/meta-data";

import Provider from "../components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetaTags({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <TailwindSizeUtil />
        </Provider>
      </body>
    </html>
  );
}
