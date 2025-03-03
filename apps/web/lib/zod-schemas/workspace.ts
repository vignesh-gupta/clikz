import { z } from "zod";

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name is required")
    .max(100, "Workspace name is too long"),
  slug: z
    .string()
    .min(1, "Workspace slug is required")
    .max(100, "Workspace slug is too long"),
  icon: z.string().optional(),
});

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;

export const MemberRole = z.enum(["ADMIN", "MEMBER"]);

export const membershipSchema = z.object({
  email: z.string().email(),
  role: MemberRole,
});

export type MembershipSchema = z.infer<typeof membershipSchema>;

export const inviteSchema = z.object({
  emails: z.array(z.string().email()),
});
