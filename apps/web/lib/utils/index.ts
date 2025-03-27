export const textToSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

export const groupByParam = <T extends Record<string, any>>(
  data: T[] = [],
  param: keyof T
) => {
  // Group by given param and return short_url, url, linkId, amt (count of param)

  const group = new Map<string, T & { amt: number }>();

  data.forEach((item) => {
    const key = String(item[param]);
    if (group.has(key)) {
      group.get(key)!.amt += 1;
    } else {
      group.set(key, {
        ...item,
        amt: 1,
      });
    }
  });

  return Array.from(group.values());
};

export const truncate = (str: string | undefined, length: number) => {
  if (!str) return undefined;

  return str.length > length ? `${str.slice(0, length)}...` : str;
};
