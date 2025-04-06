import slugify from "@sindresorhus/slugify";

export const textToSlug = (text: string) => slugify(text);
