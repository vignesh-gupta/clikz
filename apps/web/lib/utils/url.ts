import { RawAnalyticsData } from "../types";

export const paramsMetadata = [
  { display: "UTM Source", key: "utm_source", examples: "twitter, facebook" },
  { display: "UTM Medium", key: "utm_medium", examples: "social, email" },
  { display: "UTM Campaign", key: "utm_campaign", examples: "summer_sale" },
  { display: "UTM Term", key: "utm_term", examples: "blue_shoes" },
  { display: "UTM Content", key: "utm_content", examples: "logolink" },
  { display: "Referral (ref)", key: "ref", examples: "twitter, facebook" },
];

export const getUrlWithoutUTMParams = (url: string) => {
  try {
    const newURL = new URL(url);
    paramsMetadata.forEach((param) => newURL.searchParams.delete(param.key));
    return newURL.toString();
  } catch (e) {
    return url;
  }
};

export function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export const getDomainWithoutWWW = (url: string) => {
  if (isValidUrl(url)) {
    return new URL(url).hostname.replace(/^www\./, "");
  }
  try {
    if (url.includes(".") && !url.includes(" ")) {
      return new URL(`https://${url}`).hostname.replace(/^www\./, "");
    }
  } catch (e) {
    return null;
  }
};

export const groupByLink = (params: RawAnalyticsData[]) => {
  // Group by link_id and return short_url, url, linkId, amt (count of link_id)

  const group = new Map<
    string,
    { short_url: string; url: string; linkId: string; amt: number }
  >();

  params.forEach((param) => {
    if (group.has(param.link_id)) {
      group.get(param.link_id)!.amt += 1;
    } else {
      group.set(param.link_id, {
        short_url: param.short_url,
        url: param.url,
        linkId: param.link_id,
        amt: 1,
      });
    }
  });

  return Array.from(group.values());
};
