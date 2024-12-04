import { FC, PropsWithChildren } from "react";

import { AxiomWebVitals } from "next-axiom";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      {children}
      <Toaster />
      <AxiomWebVitals />
    </NuqsAdapter>
  );
};

export default Provider;
