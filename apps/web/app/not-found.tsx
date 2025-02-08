import Link from "next/link";

import { Button } from "@clikz/ui/components/ui/button";

import MaxWidthContainer from "~/components/max-width-container";

const Root404Page = () => {
  return (
    <MaxWidthContainer showPattern containerClassName="bg-gradient-custom">
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900  to-gray-600 inline-block text-transparent bg-clip-text font-mono">
          404
        </h1>
        <p className="text-muted-foreground">Page not found!</p>
        <Button className="mt-4" size="sm" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </MaxWidthContainer>
  );
};

export default Root404Page;
