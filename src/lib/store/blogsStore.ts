import { create } from "zustand";

export interface BlogInterface {
  author: string;
  content: string;
  date: string;
  title: string;
  image?: string;
}

interface BlogState {
  blogs: BlogInterface[];
  setBlogs: (blogs: BlogInterface[]) => void;
  addBlog: (blogs: BlogInterface) => void;
  updateBlog: (index: number, updatedBlog: BlogInterface) => void;
  deleteBlog: (index: number) => void;
  clearBlogs: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],

  setBlogs: (blogs) => set({ blogs }),

  addBlog: (blog) =>
    set((state) => ({
      blogs: [...state.blogs, blog],
    })),

  updateBlog: (index, updatedBlog) =>
    set((state) => ({
      blogs: state.blogs.map((blog, i) => (i === index ? updatedBlog : blog)),
    })),

  deleteBlog: (index) =>
    set((state) => ({
      blogs: state.blogs.filter((_, i) => i !== index),
    })),

  clearBlogs: () => set({ blogs: [] }),
}));
