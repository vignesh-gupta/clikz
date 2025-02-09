import { PropsWithChildren } from "react";

import { cn } from "@clikz/ui/lib/utils";

import { urbanist } from "~/lib/utils/font";

import Navbar from "./_components/navbar";

const PublicPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <main
      className={cn(
        "min-h-screen bg-gradient-custom font-medium px-4 pb-10",
        urbanist.className
      )}
    >
      <Navbar />
      {children}
    </main>
  );
};

export default PublicPageLayout;
