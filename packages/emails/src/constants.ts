export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_APP_DOMAIN || "localhost:3000";

export const APP_URL = APP_DOMAIN.includes("localhost")
  ? `http://${APP_DOMAIN}`
  : `https://${APP_DOMAIN}`;
