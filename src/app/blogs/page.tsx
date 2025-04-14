"use client";
import { useState, useEffect } from "react";
import { useBlogStore } from "@/lib/store/blogsStore";
export default function Blogs() {
  const setBlogs = useBlogStore((state) => state.setBlog);
  useEffect(() => {
    const blogsFromStorage = localStorage.getItem("blogs");
    if (blogsFromStorage) setBlogs(blogsFromStorage);
  }, [setBlogs]);
  const blogs = useBlogStore((state) => state.blog);
  return (
    <div className="">
      <div className="">{blogs}</div>
    </div>
  );
}
