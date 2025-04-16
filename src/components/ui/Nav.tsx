"use client";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className="bg-gray-200 h-screen flex flex-col justify-between items-center py-6">
      <div className="">
        <Button
          className="cursor-pointer"
          onClick={() => {
            router.push("/blogs");
          }}
        >
          Blogs
        </Button>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-4">
        <Button
          className="cursor-pointer"
          onClick={() => {
            router.push("/blogs/add");
          }}
        >
          Add
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => {
            router.push("/blogs/edit");
          }}
        >
          Edit
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => {
            router.push("/blogs/delete");
          }}
        >
          Delete
        </Button>
      </div>

      <div>
        <Button
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
