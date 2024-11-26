import { NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export const GET = async function GET() {
  const data = await fetchMeta("https://github.com/vignesh-gupta/");
  return NextResponse.json({
    data,
  });
};

const fetchMeta = async (url: string) => {
  return await ogs({ url });
};
