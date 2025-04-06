export const generateOTP = (): string => {
  return Math.random().toString().slice(2, 8);
};

export const generateInviteCode = () => {
  return Math.random().toString(36).substring(7);
};

export const generateRandomSlug = (length = 6) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
