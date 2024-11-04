"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import React from "react";
import Link from "next/link";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../components/moonIcon";
import { SunIcon } from "../components/sunIcon";
import Sidebar from "@/app/components/sidebar";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-start items-start">
        <Sidebar />
        <div className="flex justify-center text-2xl items-center min-h-screen flex-1 ">
          DashBoard
        </div>
      </div>
      <Footer />
    </>
  );
}
