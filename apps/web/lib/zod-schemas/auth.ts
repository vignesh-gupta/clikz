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

export const userAccountSchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
  email: z.string().email(),
  image: z.string().optional(),
});

export type UserAccountSchema = z.infer<typeof userAccountSchema>;
