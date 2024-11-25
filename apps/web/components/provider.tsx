import { FC, PropsWithChildren } from "react";
import { Toaster } from "sonner";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
};

export default Provider;
