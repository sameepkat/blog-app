"use client";
import Aside from "@/components/ui/Aside";
import Nav from "@/components/ui/Nav";
import { useEffect, useState } from "react";
import { useBlogStore } from "@/lib/store/blogsStore";

const DummyBlogs = [
  {
    author: "Alex Morgan",
    content:
      "In today's world of fast-paced technology, it's easy to get lost in the endless stream of updates, trends, and breakthroughs. But behind every line of code and every flashy user interface is a person — a developer, a designer, a dreamer. This blog is a reflection on the human side of tech. From late-night debugging sessions to the thrill of seeing a feature go live, every part of the journey matters. Today I want to share how mindfulness and intention have helped me become not just a better developer, but a better collaborator. Because at the end of the day, technology is built by people, for people.",
    date: "2025-04-14",
    title: "The Human Side of Code",
  },
  {
    author: "Sara Lee",
    content:
      "I've been working remotely for over 5 years now, and while it's not for everyone, it has completely changed how I work and live. The freedom to design your own schedule, the comfort of working from home, and the elimination of commute time are huge advantages. But remote work also comes with challenges: isolation, communication gaps, and blurred work-life boundaries. In this blog, I share my top strategies to stay productive and sane — from setting up a dedicated workspace to creating strong async communication habits with your team. Plus, a few tools I swear by to make remote work not just manageable, but enjoyable.",
    date: "2025-04-13",
    title: "Thriving While Working Remotely",
  },
  {
    author: "Jordan Fisher",
    content:
      "React 19 is finally here, and it's bringing some major changes to the table. With the introduction of server components, fine-grained suspense, and a more streamlined rendering pipeline, developers now have more tools to build faster and more scalable apps. In this blog post, I'll walk you through the top new features, how they affect your existing code, and what you need to know before upgrading. I'll also share some hands-on examples and performance benchmarks comparing React 18 and 19. If you're planning to upgrade your project or just want to stay on the bleeding edge, this post is for you.",
    date: "2025-04-12",
    title: "React 19: What’s New and Why It Matters",
  },
  {
    author: "Emily Zhang",
    content:
      "Burnout is a word that's become far too common in the tech industry. Between tight deadlines, constant Slack messages, and the pressure to stay ahead of trends, it's easy to lose sight of balance. In this blog, I dive deep into the signs of burnout and how I personally overcame a period of severe mental fatigue. I also share insights from experts in psychology and work-life wellness, along with actionable tips you can start applying today. Because the best code comes from well-rested, inspired minds — not burnt-out ones.",
    date: "2025-04-11",
    title: "Avoiding Burnout in Tech",
  },
];

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setBlogs = useBlogStore((state) => state.setBlogs);
  useEffect(() => {
    const blogsFromStorage = localStorage.getItem("blogs");
    if (!blogsFromStorage) {
      const sortedBlogs = [...DummyBlogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      localStorage.setItem("blogs", JSON.stringify(sortedBlogs));
    }
    if (blogsFromStorage) setBlogs(JSON.parse(blogsFromStorage));
  }, [setBlogs]);
  return (
    <div className="grid grid-cols-5 gap-4 h-screen">
      {" "}
      <Nav />
      <main className="bg-white p-4 col-span-3  h-screen overflow-y-scroll">
        {" "}
        {children}
      </main>
      <Aside />
    </div>
  );
}
