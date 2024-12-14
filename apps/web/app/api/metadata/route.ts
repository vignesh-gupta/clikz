import { NextResponse } from "next/server";

import { AxiomRequest, withAxiom } from "next-axiom";

export type MetadataResponse = {
  status: "success" | "error";
  data: {
    lang: string;
    title: string;
    description: string;
    image: {
      url: string;
      type: string;
      height: number;
      width: number;
      size: number;
    };
    logo: {
      url: string;
      type: string;
      height: number;
      width: number;
      size: number;
    };
  };
  statusCode: number;
};

export const GET = withAxiom(async (req: AxiomRequest) => {
  try {
    const url = decodeURIComponent(req.nextUrl.searchParams.get("url") || "");

    if (!url) {
      return NextResponse.json(
        {
          error: "Please provide a URL",
        },
        { status: 400 }
      );
    }

    const res: MetadataResponse = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(url)}`
    ).then((res) => res.json());

    if (res.status === "error" && !res.data && res.statusCode !== 200) {
      throw new Error("Failed to fetch metadata");
    }

    return NextResponse.json(
      {
        title: res.data.title,
        description: res.data.description,
        image: res.data.image.url,
        favicon: res.data.logo.url,
      },
      { status: 200 }
    );
  } catch (error) {
    req.log.error("Failed to fetch metadata", { error });
    return NextResponse.json(null, { status: 500 });
  }
});
