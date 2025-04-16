"use client";
import type { BlogInterface } from "@/lib/store/blogsStore";
import { useBlogStore } from "@/lib/store/blogsStore";
import Link from "next/link";
import Image from "next/image";

export default function Blogs() {
  const blogs: BlogInterface[] = useBlogStore((state) => state.blogs);

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {sortedBlogs.map((blog, index) => (
        <Link
          href={`/blogs/${index}`}
          key={index}
          className="group flex flex-col md:flex-row gap-6 border-b pb-6"
        >
          <div className="w-full md:w-1/3 overflow-hidden rounded-lg">
            <Image
              src={`/images/${blog.image}`}
              alt={blog.title}
              width={500}
              height={300}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 text-underline">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-500">
              {blog.author} &middot; {new Date(blog.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 line-clamp-3">{blog.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
