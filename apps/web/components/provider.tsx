import { FC, PropsWithChildren } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      {children}
      <Toaster />
    </NuqsAdapter>
  );
};

export default Provider;
