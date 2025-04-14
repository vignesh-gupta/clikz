/**
 * An array of regex patterns for routes that are public and do not require authentication.
 */
// Define an array of public route patterns without leading slashes
export const PUBLIC_ROUTES = [
  // Exact routes
  "about",
  "contact",
  "terms",
  "privacy",

  // Pattern routes (using wildcards)
  "blog/*", // All blog pages
  "products/*", // All product pages
  "api/public/*", // All public API endpoints
  "assets/*", // All static assets
  "docs/v[0-9]/*", // Documentation routes with version numbers
  "subscriptions/*", // All subscription related pages
];

/**
 * An array of routes that are used for authentication.
 * These route will redirect logged in users to settings page.
 */
export const AUTH_ROUTES = ["sign-in", "sign-up", "error", "reset", "verify"];

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
