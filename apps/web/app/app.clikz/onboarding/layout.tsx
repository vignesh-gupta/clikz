import { FC, PropsWithChildren } from "react";

import MaxWidthContainer from "~/components/max-width-container";
import { constructMetadata } from "~/lib/construct-metadata";

export const metadata = constructMetadata({
  title: "Welcome to Clikz",
});

const OnboardingLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MaxWidthContainer showPattern containerClassName="bg-gradient-custom">
      {children}
    </MaxWidthContainer>
  );
};

export default OnboardingLayout;
