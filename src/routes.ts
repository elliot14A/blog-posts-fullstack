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
import {
  createBlogPostSchema,
  getAllPostByUserIdSchema,
} from "./schema/blog_post.schema";
import {
  createBlogPost,
  getAllPostByUserId,
  getBlogPostById,
  removeBlogPost,
  updateBlogPost,
} from "./controller/blog_post.controller";

export function initroutes(): express.Router {
  const router = express.Router();
  router.use(validate_jwt);
  router.get("/health", (_: Request, res: Response) => res.sendStatus(200));
  router.post("/users/register", validate(createUserSchema), register);
  router.post("/users/login", validate(createSessionSchema), login);
  router.post("/users/logout", authorize, logout);
  router.get("/users/sessions", authorize, getUserSessions);
  router.post(
    "/blog_posts",
    [validate(createBlogPostSchema), authorize],
    createBlogPost,
  );
  router.get(
    "/blog_posts",
    [validate(getAllPostByUserIdSchema), authorize],
    getAllPostByUserId,
  );
  router.get(
    "/blog_posts/:blogPostId",
    [validate(getAllPostByUserIdSchema), authorize],
    getBlogPostById,
  );
  router.put(
    "/blog_posts/:blogPostId",
    [validate(getAllPostByUserIdSchema), authorize],
    updateBlogPost,
  );
  router.delete(
    "/blog_posts/:blogPostId",
    [validate(getAllPostByUserIdSchema), authorize],
    removeBlogPost,
  );
  return router;
}
