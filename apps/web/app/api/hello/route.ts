import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { saltAndHash } from "~/lib/utils";

export const GET = async function GET() {
  const password = "12345678#2310";

  const hashedPassword = await saltAndHash(password);

  const hashedPassword2 = await saltAndHash(password);

  const val = await bcrypt.compare(password, hashedPassword);
  const val2 = await bcrypt.compare(password, hashedPassword2);

  return NextResponse.json({
    password,
    hashedPassword,
    val,
    hashedPassword2,
    val2,
  });
};
