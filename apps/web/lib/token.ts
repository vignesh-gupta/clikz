import { prisma } from "./prisma";
import { generateOTP } from "./utils";

export const generatePasscode = async (email: string) => {
  const passcode = generateOTP();

  await prisma.passcode.deleteMany({
    where: {
      email,
    },
  });

  return await prisma.passcode.create({
    data: {
      email,
      otp: passcode,
      expiresAt: new Date(Date.now() + 1000 * 60 * 5),
    },
  });
};
