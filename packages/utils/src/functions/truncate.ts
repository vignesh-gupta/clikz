export const truncate = (str: string | undefined, length: number) => {
  if (!str) return undefined;

  return str.length > length ? `${str.slice(0, length)}...` : str;
};
