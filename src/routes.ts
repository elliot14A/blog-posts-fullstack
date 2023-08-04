import express, { Request, Response } from "express";
import { register } from "./controller/user.controller";
import { validate } from "./middleware/validate";
import { createUserSchema } from "./schema/user.schema";
import {
  logout,
  getUserSessions,
  login,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import validate_jwt from "./middleware/validate_jwt";
import authorize from "./middleware/authorize";

export function initroutes(): express.Router {
  const router = express.Router();
  router.use(validate_jwt);
  router.get("/health", (_: Request, res: Response) => res.sendStatus(200));
  router.post("/users/register", validate(createUserSchema), register);
  router.post("/users/login", validate(createSessionSchema), login);
  router.post("/users/logout", authorize, logout);
  router.get("/users/sessions", authorize, getUserSessions);
  return router;
}
