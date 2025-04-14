"use client";
import { useState, useEffect } from "react";
export default function Blogs() {
  const [blogs, setBlogs] = useState<string | null>(null);
  useEffect(() => {
    const blogsFromStorage = localStorage.getItem("blogs");
    setBlogs(blogsFromStorage);
  }, []);
  return (
    <div className="">
      <div className="">{blogs}</div>
    </div>
  );
}
