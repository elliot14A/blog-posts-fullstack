import { TypeOf, z } from "zod";
import { Tag } from "../models/blog_post.model";

const params = z.object({
  blogpostId: z.string(),
});

export const createBlogPostSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "title is a required field" })
      .min(6, "title should be atleast 6 chars long"),
    content: z
      .string({
        required_error: "content is a required field",
      })
      .min(150, "content should be atleast 150 chars long"),
    image: z
      .string({
        required_error: "image is a required field",
      })
      .url(),
    tag: z.nativeEnum(Tag, { required_error: "tag is required field" }),
  }),
});

export const updateBlogPostSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "title is a required field" })
      .min(6, "title should be atleast 6 chars long")
      .optional(),
    content: z
      .string({
        required_error: "content is a required field",
      })
      .min(150, "content should be atleast 150 chars long")
      .optional(),
    image: z
      .string({
        required_error: "image is a required field",
      })
      .url()
      .optional(),
    tag: z
      .nativeEnum(Tag, { required_error: "tag is required field" })
      .optional(),
  }),
  params: z.object({
    blogPostId: z.string({ required_error: "blogPostId is required" }),
  }),
});

export const deleteBlogPostSchema = z.object({
  params: z.object({
    blogPostId: z.string({ required_error: "blogPostId is required" }),
  }),
});

export const getBlogPostByIdSchema = z.object({
  params: z.object({
    blogPostId: z.string({ required_error: "blogPostId is required" }),
  }),
});

export const getAllPostByUserIdSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export type CreateBlogPostSchema = TypeOf<typeof createBlogPostSchema>;
export type UpdateBlogPostSchema = TypeOf<typeof updateBlogPostSchema>;
export type DeleteBlogPostSchema = TypeOf<typeof deleteBlogPostSchema>;
export type GetBlogPostByIdSchema = TypeOf<typeof getBlogPostByIdSchema>;
export type GetAllPostByUserIdSchema = TypeOf<typeof getAllPostByUserIdSchema>;
