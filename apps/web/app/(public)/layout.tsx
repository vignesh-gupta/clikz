import { PropsWithChildren } from "react";

import { cn } from "@clikz/ui/lib/utils";

import { auth } from "~/auth";
import { urbanist } from "~/lib/utils/font";

import FooterSection from "./_components/footer-section";
import Navbar from "./_components/navbar";

const PublicPageLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  const now = new Date();

  const isLoggedIn =
    !!session &&
    !!session.user &&
    !!session.expires &&
    new Date(session.expires) > now;

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
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
