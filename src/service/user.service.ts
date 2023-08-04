import UserModel, { UserInput } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(input: UserInput) {
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

  const validPassword = await user.checkPassword(password);

  if (!validPassword) {
    return false;
  }

  return omit(user, "password");
}

export async function getUserById({ id }: { id: string }) {
  return await UserModel.findById(id).lean();
}
