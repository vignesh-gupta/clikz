import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export const GET = async function GET() {
  const user = await prisma.user.findFirst({
    where: {
      email: "vighneshguptapubg@gmail.com",
      password: "$2a$10$I6uLquE62SgtHK4RtI3/BuFgf1rMH85T8dHgZF44qit1xWcCdJtpK",
    },
  });

  return NextResponse.json({ user });
};
