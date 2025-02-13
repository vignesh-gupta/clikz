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

export const groupByParam = <T extends Record<string, any>>(
  data: T[] = [],
  param: keyof T
) => {
  console.log({
    data,
  });

  // Group by given param and return short_url, url, linkId, amt (count of param)

  const group = new Map<string, T & { amt: number }>();

  data.forEach((item) => {
    const key = String(item[param]);
    if (group.has(key)) {
      group.get(key)!.amt += 1;
    } else {
      group.set(key, {
        ...item,
        amt: 1,
      });
    }
  });

  return Array.from(group.values());
};
