import { db } from "./db";
import { generateOTP } from "./utils/generate";

export const generatePasscode = async (email: string) => {
  const passcode = generateOTP();

  await db.passcode.deleteMany({
    where: {
      email,
    },
  });

  return await db.passcode.create({
    data: {
      email,
      otp: passcode,
      expiresAt: new Date(Date.now() + 1000 * 60 * 5),
    },
  })
};
