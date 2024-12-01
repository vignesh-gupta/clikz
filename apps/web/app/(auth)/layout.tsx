import { PropsWithChildren } from "react";

import MaxWidthContainer from "~/components/max-width-container";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <MaxWidthContainer
      showPattern
      className="min-h-screen flex items-center justify-center p-4"
      containerClassName="bg-gradient-custom"
    >
      {children}
    </MaxWidthContainer>
  );
};

export default AuthLayout;
