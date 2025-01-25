export type WorkspaceProp = {
  name: string;
  id: string;
  slug: string;
  userId: string;
  defaultInvite: string;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LinkProp = {
  domain: string;
  id: string;
  url: string;
  key: string;
  shortLink: string;
  comment: string | null;
  clicks: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  workspaceId: string;
  workspaceSlug: string;
} | null;

export type WorkspaceMember = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "ADMIN" | "MEMBER";
};

export type PageWorkspaceIdProps = {
  workspaceId: string;
};
