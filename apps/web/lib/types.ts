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
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  workspaceId: string;
  workspaceSlug: string;
} | null;
