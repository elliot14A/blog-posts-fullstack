import axios from "axios";
import { BlogPostType } from "./zustand/blogpost";

export const getBlogs = async (word?: string, tag?: string) => {
  try {
    let url =
      process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL + "/api/blog_posts/all";
    if (word && tag) {
      url = url + `?word=${word}&tag=${tag.toLowerCase()}`;
    } else if (word) {
      url = url + `?word=${word}`;
    } else if (tag) {
      url = url + `?tag=${tag.toLowerCase()}`;
    }
    const res = await fetch(
      process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL + "/api/blog_posts/all",
      {
        cache: "no-cache",
      },
    );
    const blogs: BlogPostType[] = [];
    const userids: Set<string> = new Set();
    const data = await res.json();
    data.data.forEach((blog: any) => {
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
    data.data.forEach((blog: any) => {
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
  } catch (err) {
    return [];
  }
};

export const getBlog = async (id: string) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL + "/api/blog_posts/" + id,
    );
    const userId = res.data.userId;
    const res2 = await axios.get(
      process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL + "/api/user/" + userId,
    );
    return {
      email: res2.data.email,
      name: res2.data.name,
      title: res.data.title,
      content: res.data.content,
      imageUrl: res.data.image,
      tag: res.data.tag,
      id: res.data.blogPostId,
      userId: res.data.userId,
    };
  } catch (err) {
    return null;
  }
};
