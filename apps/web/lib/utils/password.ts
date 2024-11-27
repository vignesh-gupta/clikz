import bcrypt from "bcryptjs";

export const saltAndHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const encode = (data: string) => Buffer.from(data).toString("base64");
export const decode = (data: string) => Buffer.from(data, "base64").toString();

export const textToSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};