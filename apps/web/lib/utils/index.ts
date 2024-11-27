export const textToSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};
