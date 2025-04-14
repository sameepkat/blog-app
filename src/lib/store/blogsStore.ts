import { create } from "zustand";

export interface BlogInterface {
  author: string;
  content: string;
  date: string;
  title: string;
}

interface BlogState {
  blogs: BlogInterface[];
  setBlogs: (blogs: BlogInterface[]) => void;
  addBlog: (blogs: BlogInterface) => void;
  clearBlogs: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],

  setBlogs: (blogs) => set({ blogs }),

  addBlog: (blog) =>
    set((state) => ({
      blogs: [...state.blogs, blog],
    })),

  clearBlogs: () => set({ blogs: [] }),
}));
