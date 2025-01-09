import React from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerClose, DrawerContent } from "./ui/drawer";

type ResponsiveModelProps = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const ResponsiveModel = ({
  children,
  onOpen,
  open,
  className,
}: ResponsiveModelProps) => {
  const isDesktop = useMediaQuery("(min-width: 786px)");

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={onOpen} modal={true}>
        <DialogContent
          className={cn(
            "w-auto max-w-screen-lg p-0 border-none overflow-y-auto hide-scrollbar",
            className,
          )}
        >
          <DialogTitle className="sr-only">Dialog</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={onOpen} setBackgroundColorOnScale={true}>
      <DrawerClose className="bg-gray-700" />
      <DrawerContent
        className={cn("overflow-y-auto hide-scrollbar max-h-[85vh]", className)}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModel;
