import { NextResponse } from "next/server";

import { AxiomRequest } from "next-axiom";

import { getUrlFromStringIfValid, isValidUrl } from "~/lib/utils/url";

export type MetadataResponse = {
  status: "success" | "error";
  data: {
    lang: string;
    title: string;
    description: string;
    image?: {
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

export const GET = async (req: AxiomRequest) => {
  try {
    const url = decodeURIComponent(req.nextUrl.searchParams.get("url") || "");

    const validUrl = getUrlFromStringIfValid(url);
    if (!url || !isValidUrl(url) || !validUrl) {
      return NextResponse.json(
        {
          error: "Please provide a valid URL",
        },
        { status: 400 }
      );
    }
    const res: MetadataResponse = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(url ?? validUrl)}`
    ).then((res) => res.json());

    if (res.status === "error" && !res.data && res.statusCode !== 200) {
      throw new Error("Failed to fetch metadata");
    }

    const resMetaData = {
      title: res.data.title,
      description: res.data.description,
      image: res.data.image?.url ?? null,
      favicon: res.data.logo?.url,
    };

    return NextResponse.json(resMetaData, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch metadata", { error });
    return NextResponse.json(null, { status: 500 });
  }
};
