import Link from "next/link";

import { SearchX } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";

const Domain404Page = () => {
  console.log("Domain404Page");

  return (
    <div className="min-h-screen pt-12 md:pt-24 lg:pt-36 sm:px-6 lg:px-8 animate-fade-in ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center flex-col">
        <div className="p-5 bg-white rounded-full text-black">
          <SearchX className="size-6" />
        </div>
        <h2 className="text-center mt-6  text-lg md:text-2xl font-extrabold">
          Link Not Found
        </h2>
        <p className="text-center mt-1 text-sm text-gray-600 mx-auto text-pretty">
          This link does not exist. Please check the URL and try again.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Link href="https://clikz.live/home">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Domain404Page;
