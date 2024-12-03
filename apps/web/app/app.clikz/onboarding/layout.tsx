import { FC, PropsWithChildren } from "react";

import MaxWidthContainer from "~/app/components/max-width-container";

const OnboardingLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MaxWidthContainer showPattern containerClassName="bg-gradient-custom">
      {children}
    </MaxWidthContainer>
  );
};

export default OnboardingLayout;
