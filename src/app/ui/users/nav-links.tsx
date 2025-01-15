"use client"

import { useContext } from "react";
import Link from "next/link"
import { UserContext } from "@/app/lib/contexts/UserContext";
import { User } from "@/app/lib/types/users";


export default function UserNavLinks() {
  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);

  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      {loginUser !== null && (<li className="mb-2">[TODO: リンク] 登録情報修正</li>)}
      {loginUser === null && (<li className="mb-2"><Link href="/users/signup">ユーザ登録</Link></li>)}
    </ol>
  )
}
