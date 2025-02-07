"use client"

import { memo, useState, useEffect, useContext } from "react"
import { redirect } from "next/navigation";
// コンポーネント
import PageTitle from "@/app/ui/common/page-title";
import LoginUserBar from "@/app/ui/common/login-user-bar";
// メソッド
import { apiFetchProjects, apiPutProjectActivate } from "@/app/api/jiraContents";
import { UserContext } from "@/app/lib/contexts/UserContext";
// 型
import { User } from "@/app/lib/types/users";
import { ProjectFromJira } from "@/app/lib/types/jiraContents";

const Home = memo(() => {

  const [projects, setProjects] = useState<ProjectFromJira[] | null>(null)

  // ログイン中のユーザ情報を取得
  const loginUser = useContext<User>(UserContext);
  // 管理者以外はトップページにリダイレクト
  if (!loginUser || !loginUser.is_superuser) { redirect("/") };

  async function fetchProjects() {
    // APIから情報を取得
    const resProjects = await apiFetchProjects();
    setProjects(resProjects)
  };

  async function onChangeChkbox(project: any) {
    // APIへ送るデータを作成
    const newProject = {...project, is_target: !project.is_target}
    // 変更した際にDBに書き込みを実施
    await apiPutProjectActivate(newProject);
    // 変更のフロント側への反映
    const newProjects = projects ? [...projects] : [];
    setProjects( newProjects.map( p => {
      return {...p, is_target: (p.id === project.id ? !p.is_target : p.is_target) }
    }) );
  };

  // ページ読み込み時にProject情報を取得しstateに登録
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <LoginUserBar loginUser={loginUser} />
        <PageTitle titleName="Projectの使用・未使用 選択" />
        {projects?.map(project => (
          <div key={project.id}>
            <input
              type="checkbox" name={project.name}
              onChange={ (e) => {onChangeChkbox(project)}}
              checked={ project.is_target === true }
            />
            {project.id}、{project.name}
          </div>
        ))}
      </main>
    </div>
  );
});

export default Home;
