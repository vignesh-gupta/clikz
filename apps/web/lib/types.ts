export type WorkspaceProp = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  slug: string;
} | null;

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
