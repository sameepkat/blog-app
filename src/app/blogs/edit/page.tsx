"use client";
import type { BlogInterface } from "@/lib/store/blogsStore";
import { useBlogStore } from "@/lib/store/blogsStore";
import Link from "next/link";

export default function Edit() {
  const blogs: BlogInterface[] = useBlogStore((state) => state.blogs);
  const sortedBlogs: BlogInterface[] = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        ✏️ Choose a Blog to Edit
      </h1>

      {sortedBlogs.map((blog, index) => (
        <Link key={index} href={`/blogs/edit/${index}`}>
          <div className="cursor-pointer rounded-md border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white hover:bg-gray-50">
            <h2 className="text-xl font-semibold hover:underline hover:scale-101 group-hover:underline">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {blog.author} &middot; {new Date(blog.date).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
