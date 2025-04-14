"use client";
import type { BlogInterface } from "@/lib/store/blogsStore";
import { useBlogStore } from "@/lib/store/blogsStore";

export default function Nav() {
  const blogs: BlogInterface[] = useBlogStore((state) => state.blogs);
  if (!blogs || blogs.length === 0) return;
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <aside className="bg-gray-100 p-4 h-screen flex flex-col gap-10 overflow-y-scroll">
      {sortedBlogs.map((blog, _) => (
        <p
          key={blog.title}
          className="font-semibold text-center cursor-pointer hover:underline"
        >
          {blog.title}
        </p>
      ))}
    </aside>
  );
}
