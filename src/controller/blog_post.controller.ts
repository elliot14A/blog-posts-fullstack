import { Request, Response } from "express";
import { Claims } from "../utils/jwt";
import {
  CreateBlogPostSchema,
  DeleteBlogPostSchema,
  GetAllPostByUserIdSchema,
  GetBlogPostByIdSchema,
  UpdateBlogPostSchema,
} from "../schema/blog_post.schema";

export function createBlogPost(
  req: Request<any, any, CreateBlogPostSchema["body"]>,
  res: Response<any, { user: Claims }>,
) {
  const userId = res.locals.user.id;
  return res.json({ userId });
}

export function updateBlogPost(
  req: Request<
    UpdateBlogPostSchema["params"],
    any,
    UpdateBlogPostSchema["body"]
  >,
  res: Response,
) {
  return res.json({ message: req.params });
}

export function removeBlogPost(req: Request<DeleteBlogPostSchema["params"]>) {
  return { message: req.params };
}

export function getBlogPostById(
  req: Request<GetBlogPostByIdSchema["params"]>,
  res: Response,
) {
  return res.json({ message: req.params });
}

export function getAllPostByUserId(
  req: Request<any, any, any, GetAllPostByUserIdSchema["query"]>,
  res: Response,
) {
  return res.json({ message: req.query });
}
