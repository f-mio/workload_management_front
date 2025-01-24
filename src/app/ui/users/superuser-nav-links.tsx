"use client"

import { useContext, memo } from "react";
import Link from "next/link"
import { CheckCircleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/app/lib/contexts/UserContext";
import { User } from "@/app/lib/types/users";


const SuperuserNavLinks = memo(() => {
  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);

  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      <li className="mb-2 flex flex-row items-center">
        <CheckCircleIcon className="h-6 mx-1 text-blue-600" />
        有効プロジェクト選択
      </li>
      <li className="mb-2 flex flex-row items-center">
        <UserPlusIcon className="h-6 mx-1 text-blue-600" />
        <Link href="/users/signup">ユーザ登録</Link>
      </li>
    </ol>
  );
});

export default SuperuserNavLinks
