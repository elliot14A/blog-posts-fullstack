import { create } from "zustand";

export interface BlogPostType {
  email: string;
  name: string;
  title: string;
  content: string;
  tag: string;
  imageUrl: string;
  id: string;
  userId: string;
}
interface BlogPostsStore {
  blogPosts: BlogPostType[];
  setBlogPosts: (blogPosts: BlogPostType[]) => void;
}

export const useBlogPostsStore = create<BlogPostsStore>((set) => ({
  blogPosts: [],
  setBlogPosts: (blogPosts) => set({ blogPosts }),
}));
