import React from "react";
import { ModeToggle } from "@/app/components/themeBtn";

export default function Header() {
  return (
    <>
      <div className="h-16 w-full flex justify-center items-center border-b rounded-lg border-black dark:border-white ">
        <h1 className="text-lg">NextAuth by by Rahul</h1>
        <ModeToggle />
      </div>
    </>
  );
}
