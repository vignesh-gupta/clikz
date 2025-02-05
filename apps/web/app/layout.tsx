import TailwindSizeUtil from "@clikz/ui/components/tailwind-size-util";
import "@clikz/ui/globals.css";

import Providers from "~/components/provider";
import { constructMetaTags } from "~/lib/meta-data";
import { inter } from "~/lib/utils/font";

export const metadata = constructMetaTags({});

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
