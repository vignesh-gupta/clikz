import { NextRequest, NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export const GET = async function GET(req: NextRequest) {
  try {
    const url = decodeURIComponent(req.nextUrl.searchParams.get("url") || "");

    const { result } = await ogs({ url });

    let image = "";

    if (result.ogImage && result.ogImage[0]) {
      image = result.ogImage[0].url ?? "";
    }

    return NextResponse.json({
      title: result.ogTitle,
      description: result.ogDescription,
      image,
    });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
