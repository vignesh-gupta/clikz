import TailwindSizeUtil from "@clikz/ui/components/tailwind-size-util";
import "@clikz/ui/globals.css";

import Providers from "~/components/provider";
import { constructMetadata } from "~/lib/meta-data";
import { inter } from "~/styles/font";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <TailwindSizeUtil />
        </Providers>
      </body>
    </html>
  );
}
