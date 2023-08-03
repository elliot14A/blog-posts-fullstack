import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is a required field" })
      .min(3, "name should be atleast 3 chars long"),
    password: z
      .string({ required_error: "password is a required field" })
      .min(6, "password should be atleast 6 chars long"),
    email: z.string({ required_error: "email is a required field" }).email(),
  }),
});

export type CreateUserSchema = z.TypeOf<typeof createUserSchema>;
