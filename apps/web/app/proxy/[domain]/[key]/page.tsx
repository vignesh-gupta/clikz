/* eslint-disable @next/next/no-img-element */
import { notFound, redirect } from "next/navigation";

import { unescape } from "html-escaper";

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

  redirect(data.url);
};

export default ProxyPage;
