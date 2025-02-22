"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { useSidebar } from "@clikz/ui/components/ui/sidebar";

import { UserButton } from "~/features/auth/components/user-button";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <div className="flex my-2 justify-between items-center">
      <div className="flex items-center gap-2">
        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <MenuIcon size={24} />
          </Button>
        ) : null}
        <h1 className="text-xl font-semibold leading-7 text-neutral-900 md:text-2xl">
          {title}
        </h1>
      </div>

      <UserButton align="end" className="md:hidden" />
    </div>
  );
};

export default PageTitle;
