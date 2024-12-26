import { db } from "~/lib/db";

export const getWorkspaceLinks = async (workspaceSlug: string) => {
  console.log("Fetching links for workspace", workspaceSlug);

  const links = await db.link.findMany({
    where: { workspaceSlug },
    orderBy: { createdAt: "desc" },
  });

  console.log(
    "Returning links",
    links.map((link) => link.key)
  );

  return links;
};
