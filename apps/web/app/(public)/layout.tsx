import { PropsWithChildren } from "react";

import { cn } from "@clikz/ui/lib/utils";

import { urbanist } from "~/lib/utils/font";

import FooterSection from "./_components/footer-section";
import Navbar from "./_components/navbar";

const PublicPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <main
        className={cn(
          "min-h-screen bg-gradient-custom font-medium px-4 ",
          urbanist.className
        )}
      >
        {children}
      </main>
      <FooterSection />
    </div>
  );
};

export default PublicPageLayout;
