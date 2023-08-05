import { Request, Response } from "express";
import { Claims } from "../utils/jwt";
import {
  CreateBlogPostSchema,
  DeleteBlogPostSchema,
  GetAllBlogPostsSchema,
  GetBlogPostByIdSchema,
  UpdateBlogPostSchema,
} from "../schema/blog_post.schema";
import {
  createBlogPost,
  deleteBlogPostById,
  getManyBlogPosts,
  getOneBlogPost,
  updatePostById,
} from "../service/blog_post.service";
import logger from "../utils/logger";

export async function createBlogPostHandler(
  req: Request<any, any, CreateBlogPostSchema["body"]>,
  res: Response<any, { user: Claims }>,
) {
  const userId = res.locals.user.id;
  try {
    const blogPost = await createBlogPost({ ...req.body, userId });
    return res.status(201).json(blogPost);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function updateBlogPostHandler(
  req: Request<
    UpdateBlogPostSchema["params"],
    any,
    UpdateBlogPostSchema["body"]
  >,
  res: Response<any, { user: Claims }>,
) {
  const userId = res.locals.user.id;
  const { blogPostId } = req.params;
  try {
    const blogPost = await getOneBlogPost({ blogPostId });
    if (!blogPost) {
      return res.sendStatus(404);
    }
    if (blogPost.userId.toString() !== userId) {
      return res.sendStatus(401);
    }
    const updatedBlogPost = await updatePostById(
      { userId, blogPostId },
      { ...req.body },
      { new: true },
    );
    return res.json(updatedBlogPost);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteBlogPostHanlder(
  req: Request<DeleteBlogPostSchema["params"]>,
  res: Response<any, { user: Claims }>,
) {
  const { blogPostId } = req.params;
  const userId = res.locals.user.id;
  try {
    const blogPost = await getOneBlogPost({ blogPostId });
    if (!blogPost) {
      return res.sendStatus(404);
    }
    if (blogPost.userId !== userId) {
      return res.sendStatus(401);
    }
    await deleteBlogPostById({ blogPostId });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function getBlogPostByIdHandler(
  req: Request<GetBlogPostByIdSchema["params"]>,
  res: Response,
) {
  const { blogPostId } = req.params;
  try {
    const blogPost = await getOneBlogPost({ blogPostId });
    if (!blogPost) {
      return res.sendStatus(404);
    }
    return res.json(blogPost);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function getAllPostByUserIdHandler(
  req: Request<any, any, any, GetAllBlogPostsSchema["query"]>,
  res: Response<any, { user: Claims }>,
) {
  const userId = res.locals.user.id;
  const { skip, limit } = convertQueryToPagination(req.query);
  try {
    const result = await getManyBlogPosts({ userId }, { skip, limit });
    result.page = skip / limit + 1;
    return res.json(result);
  } catch (error) {
    logger.error(error);
    return res.json({ message: "internal server error" });
  }
}

export async function getAllBlogPostsHandler(
  req: Request<any, any, any, GetAllBlogPostsSchema["query"]>,
  res: Response,
) {
  // default page = 1, limit = 5
  const { skip, limit } = convertQueryToPagination(req.query);
  const { word, tag } = req.query;
  try {
    const result = await getManyBlogPosts(
      {
        title: { $regex: word || /./, $options: "i" },
        tag: { $regex: tag || /./, $options: "i" },
      },
      { skip, limit },
    );
    result.page = skip / limit + 1;
    return res.json(result);
  } catch (error) {
    logger.error(error);
    return res.json({ message: "internal server error" });
  }
}

function convertQueryToPagination(query: GetAllBlogPostsSchema["query"]): {
  skip: number;
  limit: number;
} {
  // default page = 1, limit = 5
  const { page = "1", limit = "5" } = query;
  const skip = page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0;
  return { skip, limit: parseInt(limit) };
}
