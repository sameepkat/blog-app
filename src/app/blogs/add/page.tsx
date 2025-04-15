"use client";
import { cn } from "@/lib/utils";
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
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBlogStore } from "@/lib/store/blogsStore";
import type { BlogInterface } from "@/lib/store/blogsStore";

export default function Add({
  className,
  searchParams,
  ...props
}: React.ComponentProps<"div"> & { searchParams?: any }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [blogError, setBlogError] = useState(false);
  const router = useRouter();
  const addBlog = useBlogStore((state) => state.addBlog);

  const handleSubmit = () => {
    const title = titleRef.current?.value || "";
    const author = authorRef.current?.value || "";
    const content = contentRef.current?.value || "";

    if (title && author && content) {
      const newBlogObj = {
        author,
        content,
        date: new Date().toISOString().split("T")[0],
        title,
      };

      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const updatedBlogs = [...storedBlogs, newBlogObj];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogError(false);

      addBlog(newBlogObj);
      if (titleRef.current && authorRef.current && contentRef.current) {
        titleRef.current.value = "";
        authorRef.current.value = "";
        contentRef.current.value = "";
      }
      router.push("/blogs");
    } else {
      setBlogError(true);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
          <CardTitle>Add blog</CardTitle>
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
                  <Label htmlFor="content">Content</Label>
                </div>
                <textarea id="content" ref={contentRef} required rows={10} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  Add
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
