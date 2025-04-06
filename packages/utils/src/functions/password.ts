import bcrypt from "bcryptjs";

export const saltAndHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
