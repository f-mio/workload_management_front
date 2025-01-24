"use client"

import { useState, Suspense, memo } from "react";
import PageTitle from "@/app/ui/common/page-title"
import { SignupForm } from "@/app/ui/users/signup-form";

const Home = memo(() => {
  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <PageTitle titleName="ユーザ登録ページ" />
        <Suspense fallback={<div>Now Loading...</div>}>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  )
});

export default Home;
