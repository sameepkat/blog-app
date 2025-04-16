"use client";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBlogStore } from "@/lib/store/blogsStore";
import type { BlogInterface } from "@/lib/store/blogsStore";
import { toast } from "sonner";

export default function Edit() {
  const { id } = useParams();
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [blogError, setBlogError] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<BlogInterface | null>(null);
  const router = useRouter();
  const updateBlog = useBlogStore((state) => state.updateBlog);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    const blogIndex = parseInt(id as string);
    if (isNaN(blogIndex) || blogIndex < 0 || blogIndex >= storedBlogs.length) {
      router.push("/blogs/edit");
      return;
    }
    const blog = storedBlogs[blogIndex];
    if (blog) {
      setBlogToEdit(blog);

      if (titleRef.current) titleRef.current.value = blog.title;
      if (authorRef.current) authorRef.current.value = blog.author;
      if (imageRef.current) imageRef.current.value = blog.image || "";
      if (contentRef.current) contentRef.current.value = blog.content;
    }
  }, [id, router]);

  const handleSubmit = () => {
    const title = titleRef.current?.value || "";
    const author = authorRef.current?.value || "";
    const content = contentRef.current?.value || "";
    const image = imageRef.current?.value || "";

    if (title && author && content && blogToEdit) {
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");

      const updatedBlog: BlogInterface = {
        ...blogToEdit,
        title,
        author,
        content,
        image,
      };

      const updatedBlogs = storedBlogs.map(
        (blog: BlogInterface, index: number) =>
          index === parseInt(id as string) ? updatedBlog : blog,
      );
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogError(false);

      updateBlog(parseInt(id as string), updatedBlog);

      toast.success("Blog updated successfully!");
      router.push("/blogs");
    } else {
      setBlogError(true);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6")}>
      {blogError && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Blog add Failed</AlertTitle>
          <AlertDescription>
            Make sure that the input is correct.
          </AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Edit blog</CardTitle>
          <CardDescription>
            Enter Title, Author and Content for your new Blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input id="title" type="text" required ref={titleRef} />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="author">Author</Label>
                </div>
                <Input id="author" type="text" required ref={authorRef} />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="image">Image</Label>
                </div>
                <Input
                  id="image"
                  type="text"
                  placeholder="image name"
                  ref={imageRef}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="content">Content</Label>
                </div>
                <textarea
                  id="content"
                  ref={contentRef}
                  required
                  rows={10}
                  className="border rounded"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  Update
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
