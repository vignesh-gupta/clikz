/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { unescape } from "html-escaper";

import {
  BASE_DOMAIN,
  BASE_URL,
  GOOGLE_FAVICON_URL_V2,
} from "@clikz/utils/constants";
import { getApexDomain } from "@clikz/utils/functions";

import { BlurImage } from "~/components/blur-image";
import { constructMetadata } from "~/lib/meta-data";
import { getLinkViaEdgeWithKey } from "~/lib/middleware/utils";

import RedirectionToDest from "./redirection";

type ProxyPageParams = {
  params: Promise<{ domain: string; key: string }>;
};

export async function generateMetadata({
  params,
}: ProxyPageParams): Promise<Metadata> {
  const { domain, key } = await params;

  const data = await getLinkViaEdgeWithKey({
    domain: decodeURIComponent(domain), // decode domain in case it's encoded
    key: decodeURIComponent(key), // decode key in case it's encoded
  });
  if (!data || !data.proxy) {
    return {};
  }

  const apexDomain = getApexDomain(data.url);

  return constructMetadata({
    title: unescape(data.title || ""),
    description: unescape(data.description || ""),
    image: data.image ?? "/thumbnail.jpeg",
    icons: `${GOOGLE_FAVICON_URL_V2}${apexDomain ?? BASE_DOMAIN}`,
    keywords: apexDomain ? [apexDomain, domain] : [domain],
  });
}

const ProxyPage = async ({ params }: ProxyPageParams) => {
  const { domain, key } = await params;

  const data = await getLinkViaEdgeWithKey({
    domain: decodeURIComponent(domain),
    key: decodeURIComponent(key), // decode key in case it's encoded
  });

  if (!data) notFound();

  if (!data.proxy) redirect(data.url);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <RedirectionToDest url={data.url} />
      <div className="mx-5 w-full max-w-lg overflow-hidden rounded-lg border border-neutral-200 sm:mx-0">
        <img
          src={data.image || `${BASE_URL}/logo-dark.png`}
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
