/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@clikz/eslint-config/next.js", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "prefer-arrow-callback": ["error"],
    "prefer-template": ["error"],
  },
};
