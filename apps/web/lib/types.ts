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
