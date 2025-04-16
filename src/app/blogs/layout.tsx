"use client";
import Aside from "@/components/ui/Aside";
import Nav from "@/components/ui/Nav";
import { useEffect, useState } from "react";
import { BlogInterface, useBlogStore } from "@/lib/store/blogsStore";
import { useRouter } from "next/navigation";
import { DummyBlogs } from "@/lib/blogs";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setBlogs = useBlogStore((state) => state.setBlogs);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    const blogsFromStorage = localStorage.getItem("blogs");
    if (!blogsFromStorage) {
      const sortedBlogs = [...DummyBlogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      localStorage.setItem("blogs", JSON.stringify(sortedBlogs));
      setBlogs(sortedBlogs);
    } else {
      const parsedBlogsFromStorage: BlogInterface[] =
        JSON.parse(blogsFromStorage);
      const sortedBlogs = [...parsedBlogsFromStorage].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setBlogs(sortedBlogs);
    }
    setCheckingAuth(false);
  }, [router, setBlogs]);
  if (!hasMounted || checkingAuth) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-7 gap-4 h-screen">
      {" "}
      <div className="hidden md:block col-span-1">
        <Nav />
      </div>
      <main className="bg-white col-span-7  h-screen overflow-y-scroll md:col-span-5">
        {" "}
        {children}
      </main>
      <div className="hidden md:block col-span-1">
        <Aside />
      </div>
    </div>
  );
}
