import Image from "next/image";

import BrowserUI from "./_component/browser-ui";

const Domain404Page = () => {
  return (
    <div className="relative flex flex-col items-center w-full max-w-xl pt-10 mx-auto sm:pt-20">
      <div className="rounded-full [perspective:500px]">
        <div className="relative rounded-full bg-gradient-to-b from-neutral-100 to-neutral-300 p-px transition-[transform] duration-75">
          <div className="p-5 text-black bg-white rounded-full">
            <Image
              src="/logo-dark.png"
              alt="Clikz Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#fff8]"></div>
        </div>
      </div>
      <BrowserUI />
      <h1 className="font-display mt-2 text-center text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15] animate-slide-up-fade motion-reduce:animate-fade-in [--offset:20px] duration-1000 fill-mode-both">
        Welcome to Clikz
      </h1>
      <p className="mt-5 text-pretty text-base text-neutral-700 sm:text-xl animate-slide-up-fade motion-reduce:animate-fade-in [--offset:10px] delay-200 duration-1000 fill-mode-both">
        This custom domain is powered by Clikz - the link management platform
        designed for modern marketing teams.
      </p>
    </div>
  );
};

export default Domain404Page;
