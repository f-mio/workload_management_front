"use client"

import { useState, Suspense } from "react";
import { SignupForm } from "@/app/ui/users/signup-form";

export default function Home() {
  return (
    <Suspense fallback={<div>Now Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}
