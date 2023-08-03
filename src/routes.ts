import express, { Request, Response } from "express";
import { register } from "./controller/user.controller";
import { validate } from "./middleware/validate";
import { createUserSchema } from "./schema/user.schema";

export function initroutes(): express.Router {
  const router = express.Router();
  router.get("/health", (req: Request, res: Response) => res.sendStatus(200));
  router.post("/users/register", validate(createUserSchema), register);
  return router;
}
