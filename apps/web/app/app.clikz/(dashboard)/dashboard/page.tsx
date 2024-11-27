import { redirect } from "next/navigation";
import { auth } from "~/auth";
import { db } from "~/lib/db";

const PrivatePage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/sign-in");
  }

  const workspace = await db.workspace.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!workspace) {
    redirect("/onboarding");
  }

  redirect(`/${workspace.slug}`);

  return null;
};

export default PrivatePage;
