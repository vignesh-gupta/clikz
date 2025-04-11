import { auth } from "~/auth";

export const checkUser = async () => {
  const session = await auth();

  const currentUser = session?.user;

  if (!session || !currentUser || !currentUser.id || !currentUser.email) {
    return null;
  }

  return currentUser;
};
