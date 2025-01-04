"use client"
import { Suspense } from "react";
import apiServerInfo from "@/config/serverConfig";
import TopPageDescription from "@/app/ui/top/description";
import LoginForm from "./ui/users/login-form";


export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="grid grid-rows-[10px_1fr_10px] items-start justify-items-center sm:ps-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <TopPageDescription />
        {/* <Suspense fallback={<div>Now Loading...</div>}>
          <LoginForm />
        </Suspense> */}
      </main>
    </div>
  );
}
