import { Button } from "@clikz/ui/components/ui/button";
import Link from "next/link";
import MaxWidthContainer from "~/components/max-width-container";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

const Root404Page = () => {
  return (
    <MaxWidthContainer showPattern containerClassName="bg-gradient-custom">
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900  to-gray-600 inline-block text-transparent bg-clip-text">
          404
        </h1>
        <Button className="mt-4" size="sm" asChild>
          <Link href={DEFAULT_LOGIN_REDIRECT}>Go back home</Link>
        </Button>
      </div>
    </MaxWidthContainer>
  );
};

export default Root404Page;
