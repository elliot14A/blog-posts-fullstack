import { omit } from "lodash";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";

export async function createSession(userId: string) {
  const session = await SessionModel.create({ user: userId });
  return session.toJSON();
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log(email, password);
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
