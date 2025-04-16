"use client";
import type { BlogInterface } from "@/lib/store/blogsStore";
import { useBlogStore } from "@/lib/store/blogsStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Delete() {
  const blogs: BlogInterface[] = useBlogStore((state) => state.blogs);
  const deleteBlog = useBlogStore((state) => state.deleteBlog);

  const sortedBlogs: BlogInterface[] = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (index: number) => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    const updatedBlogs = storedBlogs.filter((_: any, i: number) => i !== index);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    deleteBlog(index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center  mb-6">
        🗑️ Choose a Blog to Delete
      </h1>

      {sortedBlogs.map((blog, index) => (
        <div
          key={index}
          className="rounded-md border border-gray-200 p-5 shadow-sm  flex justify-between items-center"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-800 0 ">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-500">
              {blog.author} &middot; {new Date(blog.date).toLocaleDateString()}
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="text-sm px-4 py-2  cursor-pointer  rounded  transition-colors duration-200">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className=" cursor-pointer"
                  onClick={() => {
                    handleDelete(index);
                    toast.success("Deleted successfully.");
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  );
}
