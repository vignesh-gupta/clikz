/* eslint-disable @next/next/no-img-element */
import { notFound, redirect } from "next/navigation";

import { unescape } from "html-escaper";

import { BlurImage } from "~/components/blur-image";
import { GOOGLE_FAVICON_URL_V2 } from "~/lib/constants";
import { getLinkViaEdgeWithKey } from "~/lib/middleware/utils";
import { getApexDomain } from "~/lib/utils/url";

type ProxyPageParams = {
  params: Promise<{ domain: string; key: string }>;
};

export async function generateMetadata({ params }: ProxyPageParams) {
  const { domain, key } = await params;

  const data = await getLinkViaEdgeWithKey({
    domain,
    key: decodeURIComponent(key), // decode key in case it's encoded
  });

  if (!data || !data.proxy) {
    return;
  }

  const apexDomain = getApexDomain(data.url);

  return {
    title: unescape(data.title || ""),
    description: unescape(data.description || ""),
    image: data.image,
    video: data.video,
    icons: `${GOOGLE_FAVICON_URL_V2}${apexDomain}`,
    noIndex: true,
  };
}

const ProxyPage = async ({ params }: ProxyPageParams) => {
  const { domain, key } = await params;

  const data = await getLinkViaEdgeWithKey({
    domain,
    key: decodeURIComponent(key), // decode key in case it's encoded
  });

  if (!data) notFound();

  if (!data.proxy) redirect(data.url);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="mx-5 w-full max-w-lg overflow-hidden rounded-lg border border-neutral-200 sm:mx-0">
        <img
          src={data.image}
          alt={unescape(data.title || "")}
          className="w-full object-cover"
        />
        <div className="flex space-x-3 bg-neutral-100 p-5">
          <BlurImage
            width={20}
            height={20}
            src={`${GOOGLE_FAVICON_URL_V2}${getApexDomain(data.url)}`}
            alt={unescape(data.title || "")}
            className="mt-1 h-6 w-6"
          />
          <div className="flex flex-col space-y-3">
            <h1 className="font-bold text-neutral-700">
              {unescape(data.title || "")}
            </h1>
            <p className="text-sm text-neutral-500">
              {unescape(data.description || "")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProxyPage;
