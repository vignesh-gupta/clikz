import { NextRequest, NextResponse } from "next/server";
import { signIn } from "~/lib/auth";
import { sendOtpEmail } from "~/lib/email";
import { prisma } from "~/lib/prisma";

export const POST = async (req: NextRequest) => {
  const toEmail = (await req.json()).to;

  if (!toEmail) {
    return NextResponse.json(
      { error: "to param is required" },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  sendOtpEmail(toEmail);

  return NextResponse.json({ success: true });
};

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const to = req.nextUrl.searchParams.get("to");
  if (!code || !to) {
    return NextResponse.json(
      { error: "code and to params are required" },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  const passcode = await prisma.passcode.findFirst({
    where: { email: to, otp: code },
  });
  if (!passcode || passcode.expiresAt < new Date() || passcode.otp !== code) {
    return NextResponse.json(
      { error: "Invalid code" },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  const [user] = await Promise.all([
    prisma.user.findFirst({
      where: { email: to },
    }),
    prisma.passcode.delete({
      where: { id: passcode.id },
    }),
  ]);

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  await signIn("credentials", {
    redirect: false,
    email: user.email,
    password: user.password ?? "",
  });

  return NextResponse.json({ success: true });
};