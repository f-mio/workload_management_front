import { Suspense } from "react";
import { getUser } from "@/app/lib/dal";
import TopPageDescription from "@/app/ui/top/description";
import LoginForm from "@/app/ui/users/login-form";
import LoginUserBar from "@/app/ui/users/login-user-bar";


export default async function Home() {
  // ログイン状態の場合userDataを取得
  const user = await getUser();

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start justify-items-center sm:ps-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">

        <LoginUserBar user={user} />

        <TopPageDescription />

        {/* ログインしていない場合のみ表示 */}
        {user === null && (
          <Suspense fallback={<div>Now Loading...</div>}>
            <LoginForm />
          </Suspense>
        )}
      </main>
    </div>
  );
}
