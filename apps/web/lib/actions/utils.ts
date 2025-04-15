import { auth } from "~/auth";

export const getUser = async () => {
  const session = await auth();

  const currentUser = session?.user;

  if (!session || !currentUser || !currentUser.id || !currentUser.email) {
    throw new Error("You must be signed in to perform this action");
  }

  return currentUser;
};
