import { FC, PropsWithChildren } from "react";

import GridPattern from "@clikz/ui/components/ui/grid-pattern";

const DomainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative w-full max-w-screen-lg p-6 mx-auto overflow-hidden text-center rounded-2xl bg-neutral-50 sm:p-20 sm:px-0">
      <GridPattern
        width={50}
        height={50}
        className="pointer-events-none absolute inset-[unset] left-1/2 top-0 w-[1200px] -translate-x-1/2 text-neutral-300 [mask-image:linear-gradient(transparent,black_70%)]"
      />
      <div className="absolute -inset-x-10 bottom-0 h-[60%] opacity-40 blur-[100px] bg-gradient-custom" />
      {children}
    </div>
  );
};

export default DomainLayout;
