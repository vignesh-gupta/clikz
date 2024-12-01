import { NextRequest, NextResponse } from "next/server";

import { db } from "~/lib/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;

  const workspace = await db.workspace.count({
    where: {
      slug,
    },
  });

  return NextResponse.json({ exists: workspace > 0 });
};
