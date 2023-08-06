import { Request, Response } from "express";
import { createUser, getUserById } from "../service/user.service";
import { CreateUserSchema, GetUserByIdSchema } from "../schema/user.schema";
import logger from "../utils/logger";

export async function register(
  req: Request<any, any, CreateUserSchema["body"]>,
  res: Response,
) {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (err: any) {
    const message = err.message as string;
    if (message.includes("duplicate")) {
      return res.status(409).json({
        message: "email is already taken",
      });
    }
    logger.error(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function getUser(
  req: Request<GetUserByIdSchema["params"]>,
  res: Response,
) {
  const id = req.params.userId;
  try {
    const user = await getUserById({ id });
    return res.json(user);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}
