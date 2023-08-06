"use client";
import BlogPost from "@/components/BlogPost";
import { getBlog } from "@/lib/getBlogs";
import { BlogPostType } from "@/lib/zustand/blogpost";
import { useUserStore } from "@/lib/zustand/user";
import React, { FC, useEffect } from "react";

interface PageProps {
  params: {
    blogPostId: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  const { blogPostId } = params;
  const { user } = useUserStore();
  const [blogPost, setBlogPost] = React.useState<BlogPostType | null>();
  useEffect(() => {
    getBlog(blogPostId).then((blog) => setBlogPost(blog));
  }, []);
  if (!blogPost) {
    return <div>loading...</div>;
  }
  return (
    <div className="flex flex-col h-full flex-1 gap-4 p-3 overflow-y-auto scrollbar-thumb-red scrollbar-thumb-rounded scrollbar-track-red-lighter scrollbar-w-2 scrolling-touch">
      <BlogPost
        imageUrl={blogPost.imageUrl}
        title={blogPost.title}
        name={blogPost.name}
        currentUser={user ? user.id : ""}
        userId={blogPost.userId}
        content={blogPost.content}
        id={blogPost.id}
        tag={blogPost.tag}
        email={blogPost.email}
      />
    </div>
  );
};
export default Page;
