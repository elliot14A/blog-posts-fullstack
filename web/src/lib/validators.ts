import { z } from "zod";

const email = z.string({ required_error: "email is requird" }).email();

const password = z
  .string({ required_error: "password is required" })
  .min(6, "password should be atleast 6 chars long");
export const loginCredentialsSchema = z.object({
  email,
  password,
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;

export const registerCredentialsSchema = z.object({
  email,
  password,
  name: z
    .string({ required_error: "name is required" })
    .min(3, "name should be atleast 3 chars long"),
});

export type RegisterCredentials = z.infer<typeof registerCredentialsSchema>;

export const createPostSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(6, "title should be atleast 6 chars long"),
  content: z
    .string({ required_error: "content is required" })
    .min(800, "content should be atleast 150 word long"),
  tag: z.enum(["Programming", "Gaming", "Crypto", "Finance"]),
  image: z.any(),
});

export type CreatePost = z.infer<typeof createPostSchema>;
