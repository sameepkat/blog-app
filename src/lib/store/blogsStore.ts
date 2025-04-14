import { create } from "zustand";

interface BlogsStore {
  blog: string | null;
  setBlog: (blog: string | null) => void;
}

export const useBlogStore = create<BlogsStore>((set) => ({
  blog: null,
  setBlog: (blog) => set({ blog }),
}));
