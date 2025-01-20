"use client"

import { useContext } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, ChartPieIcon } from "@heroicons/react/24/solid";
// コンポーネント
import PageTitle from "@/app/ui/common/page-title";
import LoginUserBar from "@/app/ui/common/login-user-bar";
// 関数、コンテキスト
import { UserContext } from "@/app/lib/contexts/UserContext";
// 型
import { User } from "@/app/lib/types/users";


export default function WorkLoadTop() {

  const loginUser = useContext<User>(UserContext);
  // ログイン状態でない場合はトップページにリダイレクト
  if (!loginUser) { redirect("/"); }


  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <PageTitle titleName="workload top" />

        <LoginUserBar loginUser={loginUser} />

        <div>
          <p className="my-5 text-xl">workloadページ内のリンク一覧</p>
          <ul className="ms-6">
            <Link href="/workloads/register"><li className="mb-3 flex flex-row items-center text-xl hover:bg-sky-200 hover:text-blue-700">
              <PencilSquareIcon className="h-12 mx-1 text-blue-600" />
              工数登録
            </li></Link>
            <Link href="/workloads/show/own"><li className="mb-3 flex flex-row items-center text-xl hover:bg-sky-200 hover:text-blue-700">
              <ChartBarIcon className="h-12 mx-1 text-blue-600" />
              登録情報一覧 (個人)
            </li></Link>
            <Link href="/workloads/show/team"><li className="mb-3 flex flex-row items-center text-xl hover:bg-sky-200 hover:text-blue-700">
              <ChartPieIcon className="h-12 mx-1 text-blue-600" />
              登録情報一覧 (チーム)
            </li></Link>
          </ul>
        </div>

      </main>
    </div>
  )
}
