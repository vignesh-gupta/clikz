import React from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import { Dialog, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

type ResponsiveModelProps = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const ResponsiveModel = ({ children, onOpen, open }: ResponsiveModelProps) => {
  const isDesktop = useMediaQuery("(min-width: 786px)");

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={onOpen}>
        <DialogContent className="w-full p-0 border-none overflow-y-auto hide-scrollbar">
          {children}
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={onOpen}>
      <DrawerContent className="overflow-y-auto hide-scrollbar max-h-[85vh]">
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModel;
