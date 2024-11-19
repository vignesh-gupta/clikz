import { Resend } from "resend";
import { prisma } from "./prisma";
import { generateOTP } from "./utils";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const resend = new Resend(process.env.AUTH_RESEND_KEY);

const MAIL_SENDER = "ZAP <zap@vigneshgupta.tech>"
// eslint-disable-next-line turbo/no-undeclared-env-vars
const baseUrl = process.env.NEXT_URL || null;

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

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: MAIL_SENDER,
    to: email,
    subject: "Verify your email address",
    html: `<p>Hi there,</p><p>Please verify your email address by clicking on the link below:</p><p><a href="${confirmLink}">Click here</a></p>`,
  });
};
