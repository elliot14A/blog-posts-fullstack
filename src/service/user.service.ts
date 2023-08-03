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
