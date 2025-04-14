import { PUBLIC_ROUTES } from "../constants";

export function isPublicRoute(path: string): boolean {
  // Handle undefined or null paths
  if (!path) return false;

  // Remove leading slash if present for consistency
  const normalizedPath: string = path.startsWith("/")
    ? path.substring(1)
    : path;

  // First check for exact matches
  if (PUBLIC_ROUTES.includes(normalizedPath)) {
    return true;
  }

  // Then check for wildcard pattern matches
  for (const pattern of PUBLIC_ROUTES) {
    // If the pattern includes a wildcard
    if (pattern.includes("*")) {
      // Convert the pattern to a regex
      // Escape special regex characters, then replace * with regex wildcard
      const regexPattern: RegExp = new RegExp(
        "^" +
          pattern
            .replace(/[.+?^${}()|[\]\\]/g, "\\$&") // Escape special regex chars
            .replace("*", ".*") + // Replace * with .*
          "$",
      );

      if (regexPattern.test(normalizedPath)) {
        return true;
      }
    }

    // Check for regex patterns (like docs/v[0-9]/*)
    if (pattern.includes("[") && pattern.includes("]")) {
      const regexStr: string = pattern
        .replace(/[.+?^${}()|\\]/g, "\\$&") // Escape special regex chars except brackets
        .replace("*", ".*"); // Replace * with .*

      const regexPattern: RegExp = new RegExp("^" + regexStr + "$");
      if (regexPattern.test(normalizedPath)) {
        return true;
      }
    }
  }

  return false;
}
