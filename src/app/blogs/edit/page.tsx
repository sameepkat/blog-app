"use client";
import type { BlogInterface } from "@/lib/store/blogsStore";
import { useBlogStore } from "@/lib/store/blogsStore";
import Link from "next/link";

export default function Blogs() {
  const blogs: BlogInterface[] = useBlogStore((state) => state.blogs);
  const sortedBlogs: BlogInterface[] = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return (
    <div className="space-y-4">
      {sortedBlogs.map((blog, index) => (
        <div key={blog.title} className="border-b py-4">
          <Link href={`/blogs/edit/${index}`}>
            <h2 className="text-xl font-semibold hover:underline">
              {blog.title}
            </h2>
          </Link>
          <p className="text-gray-500 text-sm">
            {blog.author} - {blog.date}
          </p>
        </div>
      ))}
    </div>
  );
}
