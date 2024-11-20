import { NextRequest, NextResponse } from "next/server";
import { db } from "~/lib/db";
import { sendVerificationEmail } from "~/lib/email";
import { generatePasscode } from "~/lib/token";

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
  const passcode = await generatePasscode(toEmail);
  await sendVerificationEmail(toEmail, passcode.otp);

  return NextResponse.json({ success: true });
};

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const to = req.nextUrl.searchParams.get("to");
  if (!code || !to) {
    return NextResponse.json(
      { error: "Missing required data" },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  const passcode = await db.passcode.findFirst({
    where: { email: to, otp: code },
  });
  if (!passcode || passcode.otp !== code) {
    return NextResponse.json(
      { error: "Invalid code" },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  if (passcode.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Code expired" },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  const [user] = await Promise.all([
    db.user.update({
      where: { email: to },
      data: { emailVerified: new Date() },
    }),
    db.passcode.delete({
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

  return NextResponse.json({ success: "Email Successfully verified" });
};
