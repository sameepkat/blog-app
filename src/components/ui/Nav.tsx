"use client";
import { Button } from "./button";
import { useRouter } from "next/navigation";
export default function Nav() {
  const router = useRouter();
  return (
    <nav className="bg-gray-200 pb-4 flex flex-col justify-end h-screen text-center ">
      {" "}
      <ul>
        <li>
          <Button
            className="sticky cursor-pointer"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}
