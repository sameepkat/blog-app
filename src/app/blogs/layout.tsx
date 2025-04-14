import Aside from "@/components/ui/Aside";
import Nav from "@/components/ui/Nav";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
