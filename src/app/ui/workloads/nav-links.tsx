"use client"

import { useContext, memo } from "react";
import Link from "next/link"
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, ChartPieIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/app/lib/contexts/UserContext";
import { User } from "@/app/lib/types/users";


const WorkloadNavLinks = memo(() => {
  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);

  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      { loginUser !== null && (
        <li className="mb-2 flex flex-row items-center">
          <PencilSquareIcon className="h-6 mx-1 text-blue-600" />
          <Link href="/workloads/register">工数登録</Link>
        </li>)
      }
      { loginUser !== null && (
        <li className="mb-2 flex flex-row items-center">
          <ChartBarIcon className="h-6 mx-1 text-blue-600" />
          <Link href="/workloads/show/own">登録情報一覧 (個人)</Link>
        </li>)
      }
      { loginUser !== null && (
        <li className="mb-2 flex flex-row items-center">
          <ChartPieIcon className="h-6 mx-1 text-blue-600" />
          <Link href="/workloads/show/team">登録情報一覧 (チーム)</Link>
        </li>)
      }
    </ol>
  );
});

export default WorkloadNavLinks;
