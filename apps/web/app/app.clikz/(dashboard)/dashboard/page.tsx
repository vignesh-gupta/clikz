import { redirect } from "next/navigation";

import { auth } from "~/auth";
import { db } from "~/lib/db";

const DashboardPage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/sign-in");
  }

  const workspace = await db.workspace.findFirst({
    where: {
      Membership: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });

  if (!workspace) {
    redirect("/onboarding");
  }

  redirect(`/${workspace.slug}`);

  return null;
};

export default DashboardPage;
