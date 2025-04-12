import { GlobeIcon } from "lucide-react";

import { BubbleIcon } from "@clikz/ui/components/bubble-icon";

const Link404Page = () => {
  return (
    <div className="relative flex flex-col items-center w-full max-w-xl pt-10 mx-auto sm:pt-20 ">
      <div className="rounded-full [perspective:500px]">
        <div className="relative rounded-full bg-gradient-to-b from-neutral-100 to-neutral-300 p-px transition-[transform] duration-75">
          <BubbleIcon>
            <GlobeIcon size={50} />
          </BubbleIcon>
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#fff8]"></div>
        </div>
      </div>
      <h1 className="font-display mt-10 text-center text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15] animate-slide-up-fade motion-reduce:animate-fade-in [--offset:20px] duration-1000 fill-mode-both">
        Link not found
      </h1>
      <p className="mt-5 text-pretty text-base text-neutral-700 sm:text-xl animate-slide-up-fade motion-reduce:animate-fade-in [--offset:10px] delay-200 duration-1000 fill-mode-both">
        This link has expired. Please contact the owner of this link to get a
        new one.
      </p>
    </div>
  );
};

export default Link404Page;
