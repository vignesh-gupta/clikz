import { auth } from "~/auth";

export const checkUser = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return null
  }

  return session.user;
}