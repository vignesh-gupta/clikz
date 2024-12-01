/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@clikz/eslint-config/next.js", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["check-file"],
  rules: {
    "prefer-arrow-callback": ["error"],
    "prefer-template": ["error"],
    "check-file/filename-naming-convention": [
      "error",
      {
        "**/*.{ts,tsx}": "KEBAB_CASE",
      },
      {
        // ignore the middle extensions of the filename to support filename like abc.config.js or smoke.spec.ts
        ignoreMiddleExtensions: true,
      },
    ],
  },
};
