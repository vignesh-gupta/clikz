import { NextRequest } from "next/server";

import { getUrlFromStringIfValid } from "~/lib/utils/url";

export const REDIRECTS_PARAMS = "redirect_url";
export const ALLOWED_QUERY_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "ref",
];

export const getFinalUrl = (url: string, req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const redirectUrl = getUrlFromStringIfValid(
    searchParams.get(REDIRECTS_PARAMS) || ""
  );

  const urlObj = redirectUrl ? new URL(redirectUrl) : new URL(url);

  if (searchParams.size > 0) {
    for (const [key, value] of searchParams.entries()) {
      urlObj.searchParams.append(key, value);
    }
  }
  return urlObj.toString();
};

export const getFinalUrlForAnalytics = async (
  url: string,
  req: NextRequest
) => {
  const searchParams = req.nextUrl.searchParams;

  const redirectUrl = getUrlFromStringIfValid(
    searchParams.get(REDIRECTS_PARAMS) || ""
  );

  const urlObj = redirectUrl ? new URL(redirectUrl) : new URL(url);

  if (searchParams.size > 0) {
    for (const [key, value] of searchParams.entries()) {
      if (ALLOWED_QUERY_PARAMS.includes(key))
        urlObj.searchParams.append(key, value);
    }
  }
  return urlObj.toString();
};
