"use client"


import { memo, Suspense, useContext } from "react";
// コンポーネント
import PageTitle from "@/app/ui/common/page-title";
import LoginForm from "@/app/ui/users/login-form";
import TopPageDescription from "@/app/ui/top/description";
import LoginUserBar from "@/app/ui/common/login-user-bar";
// 関数、コンテキスト
import { UserContext } from "./lib/contexts/UserContext";
// 型
import { User } from "./lib/types/users";


const Home = memo(() => {
  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">

        <LoginUserBar loginUser={loginUser} />

        <PageTitle titleName="本アプリケーションについて" />

        <TopPageDescription />

        {/* ログインしていない場合のみ表示 */}
        {loginUser === null  && (
          <Suspense fallback={<div>Now Loading...</div>}>
            <LoginForm />
          </Suspense>
        )}
      </main>
    </div>
  );
});

export default Home;
