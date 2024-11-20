/**
 * An array of routes that are public and do not require authentication.
 */
export const publicRoutes = ["/", "/api/hello"];

/**
 * An array of routes that are used for authentication.
 * These route will redirect logged in users to settings page.
 */
export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/error",
  "/reset",
  "/verify"
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for authentication purpose.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect URL after login.
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
