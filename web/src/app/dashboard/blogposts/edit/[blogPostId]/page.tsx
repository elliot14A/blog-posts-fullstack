"use client";
import Button from "@/components/ui/Button";
import { getBlog } from "@/lib/getBlogs";
import { uploadImage } from "@/lib/utils";
import { UpdatePost, updatePostSchema } from "@/lib/validators";
import { BlogPostType } from "@/lib/zustand/blogpost";
import { useUserStore } from "@/lib/zustand/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface PageProps {
  params: {
    blogPostId: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  const { blogPostId } = params;
  const { user } = useUserStore();
  const [blogPost, setBlogPost] = React.useState<BlogPostType | null>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UpdatePost>({
    resolver: zodResolver(updatePostSchema),
  });
  useEffect(() => {
    getBlog(blogPostId).then((blog) => {
      setBlogPost(blog);
      setValue("title", blog?.title);
      setValue("content", blog?.content);
    });
  }, [blogPostId]);
  if (!blogPost) {
    return <div>loading...</div>;
  }
  if (user?.id !== blogPost.userId) {
    return <div>you are not authorized to edit this post</div>;
  }
  return (
    <div className="flex flex-col h-full flex-1 gap-4 p-3 overflow-y-auto scrollbar-thumb-red scrollbar-thumb-rounded scrollbar-track-red-lighter scrollbar-w-2 scrolling-touch">
      <form
        onSubmit={handleSubmit(
          async (data) => {
            data.id = blogPostId;
            setIsLoading(true);
            if (data.image[0]) {
              const url = await uploadImage(data.image);
              data.image = url;
            }
            try {
              await axios.put(
                `/api/blogpost/put/`,
                {
                  id: blogPostId,
                  image: data.image,
                  title: data.title,
                  content: data.content,
                  tag: data.tag,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-refresh": refreshToken,
                  },
                },
              );
              toast.success("Blog post updated successfully");
              router.push(`/dashboard/blogposts/${blogPostId}`);
            } catch (err) {
              toast.error("Failed to update blog post");
            } finally {
              setIsLoading(false);
            }
          },
          (err) => {
            if (err.image) {
              toast.error("Please upload an image");
            }
          },
        )}
        className="mt-5 w-full mx-auto p-4 border rounded-lg border-black "
      >
        <h2 className="text-2xl font-semibold mb-4">Create a New Blog</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Blog Title
          </label>
          <input
            type="text"
            {...register("title")}
            id="title"
            name="title"
            className="w-full px-3 py-2 border rounded-md  focus:ring-black focus:border-black"
            required
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-medium">
            Blog Content
          </label>
          <textarea
            id="content"
            {...register("content")}
            name="content"
            className="w-full px-3 py-2 border rounded-md  focus:ring-black focus:border-black"
            required
            rows={4}
          />
          {errors.content && (
            <p className="text-red-500 text-xs italic">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            {...register("image")}
            id="image"
            name="image"
            className="w-full"
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tag" className="block mb-2 font-medium">
            Select Tag
          </label>
          <select
            id="tag"
            {...register("tag")}
            name="tag"
            className="w-full px-3 py-2 border rounded-md  focus:ring-black focus:border-black"
          >
            <option value="Programming">Programming</option>
            <option value="Crypto">Crypto</option>
            <option value="Finance">Finance</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>
        <Button isLoading={isLoading} className="w-full" type="submit">
          Update Blog
        </Button>
      </form>
    </div>
  );
};
export default Page;
