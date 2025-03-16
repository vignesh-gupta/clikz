"use client";

import { useParams } from "next/navigation";

const BrowserUI = () => {
  const { domain } = useParams();

  return (
    <div className="w-full mt-16">
      <div className="w-full p-1 [mask-image:linear-gradient(black_50%,transparent_90%)]">
        <div className="w-full border rounded-t-lg border-neutral-300 ring ring-black/5">
          <div className="flex items-center justify-between gap-4 rounded-t-[inherit] bg-white px-5 py-3">
            <div className="items-center hidden gap-2 grow basis-0 sm:flex *:rounded-full *:size-3 *:border *:border-black/10">
              <div className="bg-red-400 " />
              <div className="bg-yellow-400 " />
              <div className="bg-green-400 " />
            </div>
            <div className="relative min-w-0 grow truncate rounded-full bg-[radial-gradient(60%_80%_at_50%_0%,#ddd,#f5f5f5)] border border-gray-900/10 px-4 py-2 text-sm font-medium leading-none text-center">
              {domain}
            </div>
            <div className="hidden grow basis-0 sm:block" />
          </div>
          <div className="h-12 border-t border-neutral-200 bg-neutral-100/50" />
        </div>
      </div>
    </div>
  );
};

export default BrowserUI;
