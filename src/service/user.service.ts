import { SchemaDefinitionType } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(
  input: SchemaDefinitionType<
    Omit<UserDocument, "createdAt" | "updatedAt" | "checkPassword">
  >,
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }
  console.log("jere");

  const validPassword = await user.checkPassword(password);

  if (!validPassword) {
    return false;
  }

  return omit(user, "password");
}
