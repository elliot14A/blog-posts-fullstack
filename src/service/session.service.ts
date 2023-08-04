import { omit } from "lodash";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import logger from "../utils/logger";

export async function createSession(userId: string) {
  const session = await SessionModel.create({ user: userId });
  return session.toJSON();
}

export async function getSessions(userId: string, valid: boolean) {
  const sessions = await SessionModel.find({ user: userId, valid }).lean();
  logger.info(sessions);
  return sessions;
}
