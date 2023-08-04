import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BlogPostModel, {
  BlogPostDocument,
  BlogPostInput,
} from "../models/blog_post.model";

interface Pagination<T> {
  data: T[];
  total: number;
  page?: number;
}

export async function createBlogPost(input: BlogPostInput) {
  const blogPost = await BlogPostModel.create(input);
  return blogPost.toJSON();
}

export async function getOneBlogPost(
  query: FilterQuery<BlogPostDocument>,
  options: QueryOptions = { lean: true },
) {
  return await BlogPostModel.findOne<BlogPostDocument>(query, {}, options);
}

export async function getManyBlogPosts(
  query: FilterQuery<BlogPostDocument>,
  options: QueryOptions = { lean: true },
) {
  const total = await BlogPostModel.countDocuments(query);
  const blogPosts = await BlogPostModel.find(query, options);
  const response: Pagination<BlogPostDocument> = {
    data: blogPosts,
    total,
  };
  return response;
}

export async function updatePostById(
  query: FilterQuery<BlogPostDocument>,
  update: UpdateQuery<BlogPostDocument>,
  options: QueryOptions = { lean: true },
) {
  return await BlogPostModel.findOneAndUpdate(query, update, options).lean();
}

export async function deleteBlogPostById(
  query: FilterQuery<BlogPostDocument>,
  options: QueryOptions = { lean: true },
) {
  return await BlogPostModel.findOneAndDelete(query, options).lean();
}
