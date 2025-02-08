"use client"

import { useContext, memo } from "react";
import Link from "next/link"
import { CheckCircleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/app/lib/contexts/UserContext";
import { User } from "@/app/lib/types/users";


const SuperuserNavLinks = memo(() => {

  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      <li className="mb-1 flex flex-row items-center">
        <Link href="/root/project/select" className="w-full">
          <button
            className="w-full flex h-[36px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <CheckCircleIcon className="h-6 mx-1 text-blue-600" />
            有効プロジェクト選択
          </button>
        </Link>
      </li>
      <li className="flex flex-row items-center">
       <button
          className="w-full flex h-[36px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <UserPlusIcon className="h-6 mx-1 text-blue-600" />
          <Link href="/root/user/signup">ユーザ登録</Link>
        </button>
      </li>
    </ol>
  );
});

export default SuperuserNavLinks
