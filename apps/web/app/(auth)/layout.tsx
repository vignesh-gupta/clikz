import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
