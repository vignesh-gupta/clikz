import { FC, PropsWithChildren, Suspense } from "react";

import { AxiomWebVitals } from "next-axiom";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import Modals from "./modals";
import QueryProviders from "./query-provider";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      <QueryProviders>
        {children}
        <Suspense fallback={null}>
          <Modals />
        </Suspense>
      </QueryProviders>
      <Toaster />
      <AxiomWebVitals />
    </NuqsAdapter>
  );
};

export default Provider;
