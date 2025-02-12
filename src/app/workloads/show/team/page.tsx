"use client"

import { useContext } from "react";
import { redirect } from "next/navigation";
// コンポーネント
import PageTitle from "@/app/ui/common/page-title";
// 関数、コンテキスト
import { UserContext } from "@/app/lib/contexts/UserContext";
// 型
import { User } from "@/app/lib/types/users";


export default function ShowTeamWorkloads() {
  // ログイン状態を取得
  const loginUser = useContext<User>(UserContext);
  if (!loginUser) { redirect("/") }

  return (
    <>
      <PageTitle titleName="登録済み工数 確認ページ" />
      { loginUser !== null && (
        "チーム"
      )}
    </>
  );
};
