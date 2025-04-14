import Aside from "@/components/ui/Aside";
import Link from "next/link";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-5 gap-4 h-screen">
      {" "}
      <nav className="bg-gray-200 pb-4 flex flex-col justify-end h-screen text-center">
        {" "}
        <ul>
          <li>
            <Link href="/login" className="sticky">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <main className="bg-white p-4 col-span-3  h-screen overflow-y-scroll">
        {" "}
        {children}
      </main>
      <Aside />
    </div>
  );
}
