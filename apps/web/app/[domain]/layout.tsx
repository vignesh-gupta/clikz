import { FC, PropsWithChildren } from "react";

import MaxWidthContainer from "~/components/max-width-container";

const DomainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MaxWidthContainer showPattern containerClassName="bg-gradient-custom">
      {children}
    </MaxWidthContainer>
  );
};

export default DomainLayout;
