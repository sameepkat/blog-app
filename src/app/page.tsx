"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = !localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/blogs");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader size={50} color="#3B82F6" />
    </div>
  );
}
