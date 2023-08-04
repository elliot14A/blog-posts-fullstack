import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { v4 as uuid } from "uuid";

export enum Tag {
  Programming = "programming",
  Crypto = "crypto",
  Finance = "finance",
  Gaming = "gaming",
}

const blogPostSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      enum: Object.values(Tag),
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    blogPostId: {
      type: String,
      required: true,
      unique: true,
      default: function() {
        return uuid();
      },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

export interface BlogPostInput {
  userId: UserDocument["_id"];
  tag: Tag;
  title: string;
  content: string;
  image: string;
}

export interface BlogPostDocument extends BlogPostInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostModel = mongoose.model<BlogPostDocument>(
  "BlogPost",
  blogPostSchema,
);

export default BlogPostModel;
