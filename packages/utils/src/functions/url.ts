import { WORKSPACE_DEFAULT_ICON_URL } from "../constants";

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

export const getUrlFromStringIfValid = (str: string) => {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_) {
    /* empty */
  }
  return null;
};

export const getApexDomain = (url: string) => {
  const domain = getDomainWithoutWWW(url);
  if (domain) {
    const parts = domain.split(".");
    return parts.slice(-2).join(".");
  }
  return null;
};

export const getSubdomain = (url: string) => {
  const domain = getDomainWithoutWWW(url);
  if (domain) {
    const parts = domain.split(".");
    return parts.slice(0, parts.length - 2).join(".");
  }
  return null;
};

export const getWorkspaceURL = (slug: string, icon?: string | null) => {
  if (icon) return icon;

  return `${WORKSPACE_DEFAULT_ICON_URL}${slug}`;
};
