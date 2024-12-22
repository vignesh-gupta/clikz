import { FC, PropsWithChildren, Suspense } from "react";

import { AxiomWebVitals } from "next-axiom";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import Modals from "./modals";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      {children}
      <Toaster />
      <Suspense fallback={null}>
        <Modals />
      </Suspense>
      <AxiomWebVitals />
    </NuqsAdapter>
  );
};

export default Provider;
