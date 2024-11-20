import { Resend } from "resend";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const resend = new Resend(process.env.AUTH_RESEND_KEY);

const MAIL_SENDER = "ZAP <zap@vigneshgupta.tech>";
// eslint-disable-next-line turbo/no-undeclared-env-vars
const baseUrl = process.env.NEXT_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/verify?to=${email}&code=${token}`;

  await resend.emails.send({
    from: MAIL_SENDER,
    to: email,
    subject: "Verify your email address",
    html: `<p>Hi there,</p><p>Please verify your email address by clicking on the link below:</p><p><a href="${confirmLink}">Click here</a></p>`,
  });
};
