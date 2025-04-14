"use client";
interface BlogsInterface {
  author: string;
  content: string;
  date: string;
  title: string;
}

import { useBlogStore } from "@/lib/store/blogsStore";

export default function Nav() {
  const blogs = useBlogStore((state) => state.blog);
  if (!blogs) return;
  const blogsObj: BlogsInterface[] = JSON.parse(blogs as string);
  return (
    <aside className="bg-gray-100 p-4 h-screen flex flex-col gap-10">
      {blogsObj.map((blog, _) => (
        <p key={blog.title} className="font-semibold text-center">
          {blog.title}
        </p>
      ))}
    </aside>
  );
}
