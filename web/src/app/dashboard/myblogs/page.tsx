"use client";
import BlogPost from "@/components/BlogPost";
import { useBlogPostsStore } from "@/lib/zustand/blogpost";
import { useUserStore } from "@/lib/zustand/user";
const Page = () => {
  const { blogPosts } = useBlogPostsStore();
  const { user } = useUserStore();

  const myBlogs = blogPosts.filter((post) => post.userId === user!.id);
  return (
    <>
      <div className="border-b border-black text-3xl">My Posts</div>
      <div className="flex flex-col h-full flex-1 gap-4 p-3 overflow-y-auto scrollbar-thumb-red scrollbar-thumb-rounded scrollbar-track-red-lighter scrollbar-w-2 scrolling-touch">
        {myBlogs.map((post) => (
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
