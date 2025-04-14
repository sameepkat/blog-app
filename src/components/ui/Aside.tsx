"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [blogs, setBlogs] = useState<string | null>(null);
  useEffect(() => {
    const blogsFromStorage = localStorage.getItem("blogs");
  });
  return <aside className="bg-gray-100 p-4 h-screen">aside</aside>;
}
