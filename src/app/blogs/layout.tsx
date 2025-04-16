"use client";
import { useEffect, useState } from "react";
import { BlogInterface, useBlogStore } from "@/lib/store/blogsStore";
import { useRouter } from "next/navigation";
import { DummyBlogs } from "@/lib/blogs";
import { ClipLoader } from "react-spinners";
import Aside from "@/components/ui/Aside";
import Nav from "@/components/ui/Nav";
import { Menu, PanelRightClose, X } from "lucide-react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setBlogs = useBlogStore((state) => state.setBlogs);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showAside, setShowAside] = useState(false);

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

  if (!hasMounted || checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white flex justify-between items-center px-4 py-3 border-b shadow">
        <button onClick={() => setShowNav(true)}>
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
        <button onClick={() => setShowAside(true)}>
          <PanelRightClose className="w-6 h-6 text-gray-800" />
        </button>
      </div>
      {showNav && (
        <div className="fixed inset-0 z-40 flex">
          <div className="bg-white w-64 h-full shadow-lg relative z-50">
            <button
              onClick={() => setShowNav(false)}
              className="absolute top-3 right-3 text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <Nav />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setShowNav(false)}
          />
        </div>
      )}

      {showAside && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg relative z-50">
            <button
              onClick={() => setShowAside(false)}
              className="absolute top-3 left-3 text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <Aside />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setShowAside(false)}
          />
        </div>
      )}
      <div className="grid grid-cols-7 gap-4 h-screen">
        <div className="hidden md:block col-span-1 z-10">
          <Nav />
        </div>
        <main className="col-span-7 md:col-span-5 overflow-y-scroll pt-14 md:pt-0 z-0 bg-white">
          {children}
        </main>
        <div className="hidden md:block col-span-1 z-10">
          <Aside />
        </div>
      </div>
    </div>
  );
}
