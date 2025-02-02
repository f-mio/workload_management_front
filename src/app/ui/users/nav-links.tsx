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
        <li className="flex flex-row items-center">
          <Link href="#" className="w-full">
            <button
              className="w-full flex h-[36px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <UserCircleIcon className="h-6 mx-1 text-blue-600" />
              [TODO] 登録情報修正
            </button>
          </Link>
        </li>)
      }
    </ol>
  );
});

export default UserNavLinks;
