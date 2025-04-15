"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = !localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      router.push("/signup");
    } else {
      router.push("/blogs");
    }
  }, [router]);

  return <div>Redirecting...</div>;
}
