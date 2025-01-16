"use client"

import { useContext } from "react";
import Link from "next/link"
import { UserContext } from "@/app/lib/contexts/UserContext";
import { User } from "@/app/lib/types/users";


export default function ShowTeamWorkloads() {
  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);

  return (
    <>
      { loginUser !== null && (
        <h1> title team</h1>
      )}
    </>
  );
};
