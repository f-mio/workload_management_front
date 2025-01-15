"use client"

import { useContext } from "react";
import { User } from "@/app/lib/types/users";
import { UserContext } from "@/app/lib/contexts/UserContext";
import LoginUserBar from "@/app/ui/users/login-user-bar";


export default function WorkLoadTop() {

  const loginUser = useContext<User>(UserContext);

  return (
    <div>
      <h1 className="underline">workload top</h1>
      <LoginUserBar />
    </div>
  )
}
