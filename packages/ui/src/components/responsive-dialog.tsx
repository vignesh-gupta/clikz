import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";

type ResponsiveModelProps = {
  open?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
  title?: string;
};

const ResponsiveModel = ({
  children,
  onOpen,
  open,
  className,
  trigger,
  title,
}: ResponsiveModelProps) => {
  const isDesktop = useMediaQuery("(min-width: 786px)");

  if (!isDesktop)
    return (
      <Drawer
        open={open}
        onOpenChange={onOpen}
        setBackgroundColorOnScale={true}
      >
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerClose className="bg-gray-700" />
        <DrawerContent className={cn("px-2", className)}>
          <ScrollArea className="overflow-y-auto hide-scrollbar inset-x-0">
            {title && <DrawerTitle className="mb-2">{title}</DrawerTitle>}
            {children}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          "w-auto max-w-screen-lg border-none overflow-y-auto hide-scrollbar",
          className,
        )}
        aria-describedby="responsive-dialog"
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveModel;
