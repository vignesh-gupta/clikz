import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name is required")
    .max(100, "Workspace name is too long"),
  slug: z
    .string()
    .min(1, "Workspace slug is required")
    .max(100, "Workspace slug is too long"),
});

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;

export const linkSchema = z.object({
  destination: z.string().url(),
  slug: z.string(),
  comment: z.string().optional(),
});

export type LinkSchema = z.infer<typeof linkSchema>;
