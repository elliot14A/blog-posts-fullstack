import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BlogPostModel, {
  BlogPostDocument,
  BlogPostInput,
} from "../models/blog_post.model";

interface PaginateOptions {
  page?: number;
  limit?: number;
}

export async function createBlogPost(input: BlogPostInput) {
  try {
    const blogPost = await BlogPostModel.create(input);
    return blogPost.toJSON();
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getBlogPostById(
  query: FilterQuery<BlogPostDocument>,
  options: QueryOptions = { lean: true },
) {
  return await BlogPostModel.findOne(query, {}, options).lean();
}

export async function getAllBlogByUserId(
  query: FilterQuery<BlogPostDocument>,
  options: QueryOptions = { lean: true },
  { page, limit }: PaginateOptions,
) {
  const skip = page && limit ? page * limit : 0;
  return await BlogPostModel.find(query, {}, options)
    .skip(skip)
    .limit(limit || 0)
    .lean();
}

export async function getAllBlogPost({ page, limit }: PaginateOptions) {
  const skip = page && limit ? page * limit : 0;
  return await BlogPostModel.find({})
    .skip(skip)
    .limit(limit || 0)
    .lean();
}

export async function updatePostById(
  query: FilterQuery<BlogPostDocument>,
  update: UpdateQuery<BlogPostDocument>,
  options: QueryOptions = { lean: true },
) {
  return await BlogPostModel.findOneAndUpdate(query, update, options).lean();
}

export async function deletePostById(
  query: FilterQuery<BlogPostDocument>,
  options: QueryOptions = { lean: true },
) {
  return await BlogPostModel.findOneAndDelete(query, options).lean();
}
