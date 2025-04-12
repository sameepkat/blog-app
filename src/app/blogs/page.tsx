"use client";
import { Button } from "@/components/ui/button";
export default function Blogs() {
  return (
    <div className="">
      <div className="font-bold p-2 m-2">Blogs Page</div>
      <Button onClick={() => console.log("Clicked")}>Click me</Button>
    </div>
  );
}
