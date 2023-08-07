"use client";
import { CreatePost, createPostSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import Button from "@/components/ui/Button";
import { uploadImage } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Page: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreatePost>({
    resolver: zodResolver(createPostSchema),
  });
  const createPost = async (data: CreatePost) => {
    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(data.image);
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      const res = await axios.post(
        "/api/blogpost/create",
        {
          image: imageUrl,
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
      toast.success("Blog created successfully");
      router.push(`/dashboard/blogposts/${res.data.blogPostId}`);
    } catch (err) {
      toast.error("Failed to create blog");
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full border-black border-b text-3xl font-bold">
        Create
      </div>
      <form
        onSubmit={handleSubmit(
          (data) => {
            if (!data.image || data.image.length <= 0) {
              toast.error("Please upload an image");
              return;
            }
            createPost(data);
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
        <Button isLoading={isLoading} className="w-full" type="submit">
          Create Blog
        </Button>
      </form>
    </div>
  );
};
export default Page;
