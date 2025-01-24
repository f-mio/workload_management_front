"use client"

import { useContext, memo } from "react";
import Link from "next/link"
import { UserCircleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/app/lib/contexts/UserContext";
import { User } from "@/app/lib/types/users";


const UserNavLinks = memo(() => {
  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);

  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      { loginUser !== null && (
        <li className="mb-2 flex flex-row items-center">
          <UserCircleIcon className="h-6 mx-1 text-blue-600" />
          {/* <Link href="/users/edit">登録情報修正</Link> */}
          [TODO] 登録情報修正
        </li>)
      }
    </ol>
  );
});

export default UserNavLinks;
