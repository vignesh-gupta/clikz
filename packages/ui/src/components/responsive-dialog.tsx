import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";

type ResponsiveModelProps = {
  open?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
};

const ResponsiveModel = ({
  children,
  onOpen,
  open,
  className,
  trigger,
}: ResponsiveModelProps) => {
  const isDesktop = useMediaQuery("(min-width: 786px)");

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={onOpen} modal={true}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
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
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerClose className="bg-gray-700" />
      <DrawerContent className={className}>
        <ScrollArea className="overflow-y-auto hide-scrollbar">
          {children}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModel;
