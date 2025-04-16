"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { BlogInterface } from "@/lib/store/blogsStore";
import Image from "next/image";

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogInterface | null>(null);

  useEffect(() => {
    const blogsFromStorage = JSON.parse(localStorage.getItem("blogs") || "[]");
    const sortedBlogs = [...blogsFromStorage].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const blogIndex = parseInt(id as string);

    if (!isNaN(blogIndex) && sortedBlogs[blogIndex]) {
      setBlog(sortedBlogs[blogIndex]);
    }
  }, [id]);

  if (!blog) return <div className="p-4">Blog not found</div>;

  return (
    <div className="p-1 max-w-2xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="flex justify-between text-gray-600 mb-4">
        <span>Author: {blog.author}</span>
        <span>Author: {blog.date}</span>
      </div>
      <hr className="mb-6" />
      {blog.image && (
        <Image
          src={`/images/${blog.image}`}
          alt={blog.image}
          width={window.innerWidth}
          height={300}
        />
      )}
      <p className="text-lg whitespace-pre-wrap my-10">{blog.content}</p>
    </div>
  );
}
