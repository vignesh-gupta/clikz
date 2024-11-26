import { load } from "cheerio";

export type FetchMetadata = {
  title: string;
  description: string;
  image: string;
};

export async function fetchMetadata(url: string): Promise<FetchMetadata> {
  try {

    console.log("Fetching metadata for:", url);
    

    const response = await fetch(url);
    const html = await response.text();
    const cheerio = load(html);
    
    return {
      title:
        cheerio('meta[property="og:title"]').attr("content") ||
        cheerio('meta[name="twitter:title"]').attr("content") ||
        cheerio("title").text() ||
        "",
      description:
        cheerio('meta[property="og:description"]').attr("content") ||
        cheerio('meta[name="twitter:description"]').attr("content") ||
        cheerio('meta[name="description"]').attr("content") ||
        "",
      image:
        cheerio('meta[property="og:image"]').attr("content") ||
        cheerio('meta[name="twitter:image"]').attr("content") ||
        "",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw new Error("Failed to fetch metadata");
  }
}
