import { MemberRole } from "@prisma/client";

export type DomainVerification = {
  type: string;
  domain: string;
  value: string;
  reason: string;
};

export type WorkspaceMember = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: MemberRole;
};
