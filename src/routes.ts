import express, { Request, Response } from "express";
import { register } from "./controller/user.controller";
import { validate } from "./middleware/validate";
import { createUserSchema } from "./schema/user.schema";
import {
  logout,
  getUserSessions,
  login,
  userInfo,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import validate_jwt from "./middleware/validate_jwt";
import authorize from "./middleware/authorize";
import {
  createBlogPostSchema,
  deleteBlogPostSchema,
  getAllBlogPostsSchema,
  updateBlogPostSchema,
} from "./schema/blog_post.schema";
import {
  createBlogPostHandler,
  getAllPostByUserIdHandler,
  getBlogPostByIdHandler,
  deleteBlogPostHanlder,
  updateBlogPostHandler,
  getAllBlogPostsHandler,
} from "./controller/blog_post.controller";

export function initroutes(): express.Router {
  const router = express.Router();
  router.use(validate_jwt);
  router.get("/health", (_: Request, res: Response) => res.sendStatus(200));
  router.post("/register", validate(createUserSchema), register);
  router.post("/login", validate(createSessionSchema), login);
  router.post("/logout", authorize, logout);
  router.get("/sessions", authorize, getUserSessions);
  router.get("/user_info", authorize, userInfo);
  router.post(
    "/blog_posts",
    [validate(createBlogPostSchema), authorize],
    createBlogPostHandler,
  );
  router.get(
    "/blog_posts",
    [validate(getAllBlogPostsSchema), authorize],
    getAllPostByUserIdHandler,
  );
  router.get(
    "/blog_posts/all",
    validate(getAllBlogPostsSchema),
    getAllBlogPostsHandler,
  );
  router.get("/blog_posts/:blogPostId", getBlogPostByIdHandler);
  router.put(
    "/blog_posts/:blogPostId",
    [validate(updateBlogPostSchema), authorize],
    updateBlogPostHandler,
  );
  router.delete(
    "/blog_posts/:blogPostId",
    [validate(deleteBlogPostSchema), authorize],
    deleteBlogPostHanlder,
  );
  return router;
}
