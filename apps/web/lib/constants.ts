/* eslint-disable turbo/no-undeclared-env-vars */
export const APP_NAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "app.localhost:3000",
  "localhost",
])