import bcrypt from "bcryptjs";

export const saltAndHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const encode = (data: string) => Buffer.from(data).toString("base64");
export const decode = (data: string) => Buffer.from(data, "base64").toString();

export const generateOTP = (): string => {
  return Math.random().toString().slice(2, 8);
};

export const generateInviteCode = () => {
  return Math.random().toString(36).substring(7);
};

export const generateRandomSlug = (length = 6) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const textToSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

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