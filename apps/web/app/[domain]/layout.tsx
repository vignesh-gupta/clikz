import Link from "next/link";
import { FC, PropsWithChildren } from "react";

import { Button } from "@clikz/ui/components/ui/button";
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
      <div className="flex flex-col justify-center sm:flex-row relative mx-auto mt-8 items-center gap-4 animate-slide-up-fade motion-reduce:animate-fade-in [--offset:5px] delay-300 duration-1000 fill-mode-both">
        <Button
          className="px-8 py-2 text-white bg-black rounded hover:bg-gray-800"
          asChild
        >
          <Link href="/">Try Clikz</Link>
        </Button>

        <Button
          variant="outline"
          className="px-8 py-2 text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-50"
          asChild
        >
          <Link href="/help/invitations">Learn More</Link>
        </Button>
      </div>
    </div>
  );
};

export default DomainLayout;
