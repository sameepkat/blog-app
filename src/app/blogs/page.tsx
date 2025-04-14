"use client";
import { useState, useEffect } from "react";
import type { BlogInterface } from "@/lib/store/blogsStore";
import { useBlogStore } from "@/lib/store/blogsStore";

export default function Blogs() {
  const setBlogs = useBlogStore((state) => state.setBlogs);
  useEffect(() => {
    const blogsFromStorage = localStorage.getItem("blogs");
    if (blogsFromStorage) setBlogs(JSON.parse(blogsFromStorage));
  }, [setBlogs]);
  const blogs: BlogInterface[] = useBlogStore((state) => state.blogs);
  const blog = blogs[0];
  if (!blog) return;
  return (
    <div className="">
      <h1 className="font-bold text-center text-3xl p-4">{blog.title}</h1>
      <div className="flex justify-between text-gray-700">
        <span>Author: {blog.author}</span>
        <span>Date: {blog.date}</span>
      </div>
      <hr />
      <p className="pt-10">{blog.content}</p>
    </div>
  );
}
