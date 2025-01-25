"use client"

import { useState, useEffect, useContext, memo } from "react";
import Link from "next/link"
// コンポーネント
import PageTitle from "@/app/ui/common/page-title";
import JiraUploadButton from "@/app/ui/workloads/jira-update-button";
import LoginUserBar from "@/app/ui/common/login-user-bar";
import FilterForm from "@/app/ui/workloads/register/filter-form";
import SubtaskSelector from "@/app/ui/workloads/register/subtask-selector";
// 関数
import { apiFetchUsers } from "@/app/api/users";
import { apiFetchIssues, apiFetchProjects, apiFetchSubtasks } from "@/app/api/jiraContents";
import { apiFetchUserWorkload } from "@/app/api/workloads";
import { UserContext } from "@/app/lib/contexts/UserContext";
// 型
import { Project, Issue, Subtask } from "@/app/lib/types/jiraContents";
import { User } from "@/app/lib/types/users";
import { Workload } from "@/app/lib/types/workloads";
import { redirect } from "next/navigation";


/**
 * @returns {ReactDOM}
 */
export default function RegisterWorkload() {
  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);
  // ログイン状態でない場合はトップページにリダイレクト
  if (!loginUser) { redirect("/"); }

  // DBから取得する値 (マスタとして使用)
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [subtasks, setSubtasks] = useState<Subtask[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [workloads, setWorkloads] = useState<Workload[] | null>(null);
  // issue種類
  const [epics, setEpics] = useState<Issue[] | null>(null);
  const [stories, setStories] = useState<Issue[] | null>(null);
  const [bugs, setBugs] = useState<Issue[] | null>(null);
  const [tasks, setTasks] = useState<Issue[] | null>(null);

  // フォームの選択肢
  const [filteredEpics, setFilteredEpics] = useState<Issue[] | null>(null);
  const [filteredStories, setFilteredStories] = useState<Issue[] | null>(null);
  const [filteredBugs, setFilteredBugs] = useState<Issue[] | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Issue[] | null>(null);
  const [filteredSubtasks, setFilteredSubtasks] = useState<Subtask[] | null>(null);

  // フォーム内の値
  const [dateFormVal, setDateFormVal] = useState<string|null>(null);

  const epicName = "エピック",
    bugName = "バグ",
    storyName = "ストーリー",
    taskName = "タスク";

  // TODO
  useEffect(() => {
    const fetchSubtasks = async () => {
      // APIから情報を取得
      const resProjects = await apiFetchProjects();
      const resIssues = await apiFetchIssues();
      const resSubtasks = await apiFetchSubtasks();
      const resUsers = await apiFetchUsers();
      const resWorkloads = await apiFetchUserWorkload(loginUser);
      // issueをepic, story, bug, taskに振り分け
      const epics = resIssues?.filter( issue => issue?.type == epicName ? issue : null) || null;
      const stories = resIssues?.filter( issue => issue?.type == storyName ? issue : null) || null;
      const bugs = resIssues?.filter( issue => issue?.type == bugName ? issue : null) || null;
      const tasks = resIssues?.filter( issue => issue?.type == taskName ? issue : null) || null;

      // stateの更新 (情報のマスタ)
      setProjects(resProjects);
      setIssues(resIssues);
      setSubtasks(resSubtasks);
      setUsers(resUsers);
      setWorkloads(resWorkloads);
      setEpics(epics);
      setStories(stories);
      setBugs(bugs);
      setTasks(tasks);
      // stateの更新 (フィルタ)
      setFilteredEpics(epics);
      setFilteredStories(stories);
      setFilteredBugs(bugs);
      setFilteredTasks(tasks);
      setFilteredSubtasks(resSubtasks);
    };
    fetchSubtasks();
  }, []);

  function filterValueChanged() {
    const projectSelect = document.querySelector<HTMLSelectElement>("#project_select"),
      epicSelect = document.querySelector<HTMLSelectElement>("#epic_select"),
      storySelect = document.querySelector<HTMLSelectElement>("#story_select"),
      bugSelect = document.querySelector<HTMLSelectElement>("#bug_select"),
      taskSelect = document.querySelector<HTMLSelectElement>("#task_select");
    const projectVal = projectSelect ? projectSelect.value : "0",
      epicVal = epicSelect ? epicSelect.value : "0",
      storyVal = storySelect ? storySelect.value : "0",
      bugVal = bugSelect ? bugSelect.value : "0",
      taskVal = taskSelect ? taskSelect.value : "0";

    let newSubtasks = subtasks ? [...subtasks] : [];
    if (projectVal !== "0") {
      newSubtasks = newSubtasks.filter(item => item.path.includes(`/${projectVal}/`));
    };
    if (epicVal !== "0") {
      newSubtasks = newSubtasks.filter(item => item.path.includes(`${epicVal}>`));
    };
    if (storyVal !== "0") {
      newSubtasks = newSubtasks.filter(item => item.path.includes(`${storyVal}>`));
    };
    if (bugVal !== "0") {
      newSubtasks = newSubtasks.filter(item => item.path.includes(`${bugVal}>`));
    };
    if (taskVal !== "0") {
      newSubtasks = newSubtasks.filter(item => item.path.includes(`${taskVal}>`));
    };
    setFilteredSubtasks(newSubtasks);
  }

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <LoginUserBar loginUser={loginUser} />
        <PageTitle titleName="工数登録ページ" />
        <JiraUploadButton />
        <FilterForm
          projects={projects} epics={filteredEpics} stories={filteredStories}
          bugs={filteredBugs} tasks={filteredTasks} eventFunc={filterValueChanged}
        />
        <SubtaskSelector subtasks={filteredSubtasks} />
      </main>
    </div>
  );
};
