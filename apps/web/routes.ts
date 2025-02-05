/**
 * An array of routes that are public and do not require authentication.
 */
export const PUBLIC_ROUTE = ["/", "/test"];

/**
 * An array of routes that are used for authentication.
 * These route will redirect logged in users to settings page.
 */
export const AUTH_ROUTES = [
  "/sign-in",
  "/sign-up",
  "/error",
  "/reset",
  "/verify",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for authentication purpose.
 */
export const AUTH_API_ROUTE = "/api/auth";

/**
 * The default redirect URL after login.
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const ALLOWED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".gif",
  ".webp",
  ".ico",
  ".txt",
];
