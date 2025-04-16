"use client";
import type { BlogInterface } from "@/lib/store/blogsStore";
import { useBlogStore } from "@/lib/store/blogsStore";
import { useParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export default function Nav() {
  const blogs: BlogInterface[] = useBlogStore((state) => state.blogs);
  const { id } = useParams();
  if (!blogs || blogs.length === 0) return;
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <aside className="bg-gray-100 p-4 h-screen flex flex-col gap-10 overflow-y-scroll ">
      <div className="space-y-4">
        {sortedBlogs.map((blog, index) => (
          <div key={blog.title} className="border-b py-4">
            <Link href={`/blogs/${index}`}>
              <h2
                className={clsx(
                  "font-semibold hover:underline",
                  id === String(index) &&
                    "border-l-3 pl-1 border-black underline",
                  id !== String(index) && "text-black"
                )}
              >
                {blog.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm">{blog.author}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
