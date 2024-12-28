import { FC, PropsWithChildren, Suspense } from "react";

import { AxiomWebVitals } from "next-axiom";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { KeyboardShortcutProvider } from "@clikz/ui";

import Modals from "./modals";
import QueryProviders from "./query-provider";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      <QueryProviders>
        <KeyboardShortcutProvider>
          {children}
          <Suspense fallback={null}>
            <Modals />
          </Suspense>
        </KeyboardShortcutProvider>
      </QueryProviders>
      <Toaster />
      <AxiomWebVitals />
    </NuqsAdapter>
  );
};

export default Provider;
