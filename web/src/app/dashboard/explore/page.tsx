"use client";

import BlogPost from "@/components/BlogPost";
import { getBlogs } from "@/lib/getBlogs";
import {
  BlogPostType as BlogPostType,
  useBlogPostsStore,
} from "@/lib/zustand/blogpost";
import { useUserStore } from "@/lib/zustand/user";
import axios from "axios";
import { useState } from "react";

const Page = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [blogs, setBlogs] = useState<BlogPostType[] | null>(null);
  const { user } = useUserStore();
  const onClick = async () => {
    if (search === "") {
      return;
    }
    if (selectedTag === "All" || selectedTag === null) {
      const res = await axios.post("/api/blogpost/get", {
        word: search,
      });
      const blogs = await getUserDetails(res.data.data);
      setBlogs(blogs);
      return;
    }
    const res = await axios.post("/api/blogpost/get", {
      word: search,
      tag: selectedTag,
    });
    const blogs = await getUserDetails(res.data.data);
    setBlogs(blogs);
  };

  const tags = ["All", "Crypto", "Finance", "Gaming", "Programming"];
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
  };
  return (
    <>
      <div className="flex space-x-3 md:space-x-0">
        <div className="flex-1 w-full max-w-sm mx-auto">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-black focus:ring-black focus:border-black"
              placeholder="Search..."
            />
            <button
              onClick={onClick}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            >
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-5.2-5.2m-.8-.8c2.6-2.6 2.6-6.9 0-9.5s-6.9-2.6-9.5 0-2.6 6.9 0 9.5 6.9 2.6 9.5 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <select
            value={selectedTag || "All"}
            onChange={(e) => handleTagChange(e.target.value)}
            className="bg-white focus:ring-black rounded-md focus:border-black appearance-none"
          >
            {tags.map((tag) => (
              <option key={tag} value={tag === "All" ? "" : tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col h-full flex-1 gap-4 p-3 overflow-y-auto scrollbar-thumb-red scrollbar-thumb-rounded scrollbar-track-red-lighter scrollbar-w-2 scrolling-touch">
        {blogs?.map((post) => (
          <div key={post.id}>
            <BlogPost
              currentUser={user!.id}
              id={post.id}
              title={post.title}
              imageUrl={post.imageUrl}
              name={post.name}
              email={post.email}
              tag={post.tag}
              content={post.content}
              userId={post.userId}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;

const getUserDetails = async (data: any) => {
  const blogs: BlogPostType[] = [];
  const userids = new Set();
  data.forEach((blog: any) => {
    userids.add(blog.userId);
  });

  data.forEach((blog: any) => {
    userids.add(blog.userId);
  });
  const users = await Promise.all([
    ...Array.from(userids).map(async (userid) => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL + "/api/user/" + userid,
      );
      return res.data;
    }),
  ]);
  data.forEach((blog: any) => {
    blogs.push({
      email: users.find((user) => user._id === blog.userId)?.email,
      name: users.find((user) => user._id === blog.userId)?.name,
      title: blog.title,
      content: blog.content,
      imageUrl: blog.image,
      tag: blog.tag,
      id: blog.blogPostId,
      userId: blog.userId,
    });
  });
  return blogs;
};
