import { FC, PropsWithChildren, Suspense } from "react";

import { SessionProvider } from "next-auth/react";
import { AxiomWebVitals } from "next-axiom";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { KeyboardShortcutProvider } from "@clikz/ui";

import Modals from "./modals";
import QueryProviders from "./query-provider";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <NuqsAdapter>
        <QueryProviders>
          <KeyboardShortcutProvider>
            {children}
            <Suspense fallback={null}>
              <Modals />
            </Suspense>
          </KeyboardShortcutProvider>
        </QueryProviders>
        <Toaster closeButton />
        <AxiomWebVitals />
      </NuqsAdapter>
    </SessionProvider>
  );
};

export default Provider;
