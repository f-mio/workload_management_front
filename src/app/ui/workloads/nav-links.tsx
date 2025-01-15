"use client"

import { useContext } from "react";
import { UserContext } from "@/app/lib/contexts/UserContext";
import { User } from "@/app/lib/types/users";


export default function WorkloadNavLinks() {
  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);

  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      { loginUser !== null && (<li className="mb-2">[TODO] 工数登録</li>) }
      { loginUser !== null && (<li className="mb-2">[TODO] 登録情報一覧 (個人)</li>) }
      { loginUser !== null && (<li className="mb-2">[TODO] 登録情報一覧 (チーム)</li>) }
    </ol>
  );
}
