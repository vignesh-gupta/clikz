import { Resend } from "resend";
import { prisma } from "./prisma";
import { generateOTP } from "./utils";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendOtpEmail = async (email: string) => {
  await prisma.passcode.deleteMany({
    where: {
      email,
    },
  });

  const passcode = await prisma.passcode.create({
    data: {
      email,
      expiresAt: new Date(Date.now() + 1000 * 60 * 5), // Valid till 5 Min
      otp: generateOTP(),
    },
  });

  return resend.emails.send({
    from: "ZAP <zap@vigneshgupta.tech>",
    to: email,
    subject: `${passcode.otp} is your verification code`,
    text: `Your verification code is ${passcode.otp}`,
  });
};
