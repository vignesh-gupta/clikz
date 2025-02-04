import { FC, PropsWithChildren } from "react";

import MaxWidthContainer from "~/components/max-width-container";
import { constructMetaTags } from "~/lib/meta-data";

export const metadata = constructMetaTags({
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
