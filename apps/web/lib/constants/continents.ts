export const CONTINENTS = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
};

export const CONTINENT_CODES = Object.keys(CONTINENTS) as string[];

export type Continent = keyof typeof CONTINENTS;
