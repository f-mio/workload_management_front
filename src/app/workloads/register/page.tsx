"use client"

import { useState, useEffect, useMemo, useContext, memo } from "react";
import { redirect } from "next/navigation";
// コンポーネント
import PageTitle from "@/app/ui/common/page-title";
import LoginUserBar from "@/app/ui/common/login-user-bar";
import FilterForm from "@/app/ui/workloads/register/filter-form";
import SubtaskSelector from "@/app/ui/workloads/register/subtask-selector";
import WorkloadList from "@/app/ui/workloads/register/workload-list"; 
import JiraUploadButton from "@/app/ui/workloads/jira-update-button";
// 関数
import { apiFetchIssues, apiFetchProjects, apiFetchSubtasks } from "@/app/api/jiraContents";
import { apiFetchSpecifyWorkloads } from "@/app/api/workloads";
import { UserContext } from "@/app/lib/contexts/UserContext";
// 型
import { Project, Issue, SubtaskWithParents } from "@/app/lib/types/jiraContents";
import { User } from "@/app/lib/types/users";
import { ResisteredWorkload } from "@/app/lib/types/workloads";


/**
 * @returns {ReactDOM}
 */
const RegisterWorkload = memo(() => {
    // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);
  // ログイン状態でない場合はトップページにリダイレクト
  if (!loginUser) { redirect("/"); }

  // DBから取得する値 (マスタとして使用)
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [subtasks, setSubtasks] = useState<SubtaskWithParents[] | null>(null);
  const [workloads, setWorkloads] = useState<ResisteredWorkload[] | null>(null);
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
  const [filteredSubtasks, setFilteredSubtasks] = useState<SubtaskWithParents[] | null>(null);

  const epicName = "エピック",
    bugName = "バグ",
    storyName = "ストーリー",
    taskName = "タスク";

  async function fetchWorkloadsFromDb(targetDate: string) {
    const searchCondition = { specify_user_id: loginUser?.id, target_date: targetDate};
    const resWorkloads = await apiFetchSpecifyWorkloads(loginUser, searchCondition);
    setWorkloads(resWorkloads);
  };

  // ページ読み込み時にAPIからフォームの値をセットする。
  useEffect(() => {
    const fetchSubtasks = async () => {
      // APIから情報を取得
      const resProjects = await apiFetchProjects();
      const resIssues = await apiFetchIssues();
      const resSubtasks = await apiFetchSubtasks();
      // issueをepic, story, bug, taskに振り分け
      const epics = resIssues?.filter( issue => issue?.type == epicName ) || null;
      const stories = resIssues?.filter( issue => issue?.type == storyName ) || null;
      const bugs = resIssues?.filter( issue => issue?.type == bugName ) || null;
      const tasks = resIssues?.filter( issue => issue?.type == taskName ) || null;

      // stateの更新 (情報のマスタ)
      setProjects(resProjects);
      setIssues(resIssues);
      setSubtasks(resSubtasks);
      // setUsers(resUsers);
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
    async function fetchTodayWorkloads() {
      const todayStr = new Date().toISOString().split('T')[0];
      fetchWorkloadsFromDb(todayStr);
    }
    fetchSubtasks();
    fetchTodayWorkloads();
  }, []);

  function filterValueChanged(e: Event) {
    const projectSelect = document.querySelector<HTMLSelectElement>("#project_select"),
      projectVal = projectSelect ? projectSelect.value : "0";

    let newSubtasks = subtasks ? [...subtasks] : [];
    if (projectVal !== "0") {
      newSubtasks = newSubtasks.filter(item => item.project_id == parseInt(projectVal) );
    };
    // projectでフィルタ
    setFilteredEpics(epics?.filter(item => (item.project_id == parseInt(projectVal) || parseInt(projectVal) == 0)) || null);
    setFilteredStories(stories?.filter(item => ( item.project_id == parseInt(projectVal) || parseInt(projectVal) == 0)) || null);
    setFilteredBugs(bugs?.filter(item => ( item.project_id == parseInt(projectVal) || parseInt(projectVal) == 0)) || null);
    setFilteredTasks(tasks?.filter(item => ( item.project_id == parseInt(projectVal) || parseInt(projectVal) == 0)) || null);

    // ecpiフィルタ
    const epicSelect = document.querySelector<HTMLSelectElement>("#epic_select"),
      epicVal = epicSelect ? epicSelect.value : "0",
      existsSelectedEpic = (
        epics?.filter(item => (
          ( item.id === parseInt(epicVal) && (
            item.project_id == parseInt(projectVal) || parseInt(projectVal) === 0))
        )))?.length;
    if ( existsSelectedEpic && parseInt(epicVal) !== 0 ) {
      newSubtasks = newSubtasks.filter(item => item.issue_id_1 == parseInt(epicVal));
    };

    const storySelect = document.querySelector<HTMLSelectElement>("#story_select"),
      bugSelect = document.querySelector<HTMLSelectElement>("#bug_select"),
      taskSelect = document.querySelector<HTMLSelectElement>("#task_select");
    const storyVal = storySelect ? storySelect.value : "0",
      bugVal = bugSelect ? bugSelect.value : "0",
      taskVal = taskSelect ? taskSelect.value : "0";
    const existsSelectedStory = ( stories?.filter(item => (
        ( item.id === parseInt(storyVal) && (
          item.project_id == parseInt(projectVal) || parseInt(projectVal) === 0))
      )))?.length,
      existsSelectedBug = ( bugs?.filter(item => (
        ( item.id === parseInt(bugVal) && (
          item.project_id == parseInt(projectVal) || parseInt(projectVal) === 0))
      )))?.length,
      existsSelectedTask = ( tasks?.filter(item => (
        ( item.id === parseInt(taskVal) && (
          item.project_id == parseInt(projectVal) || parseInt(projectVal) === 0))
      )))?.length;

    // story, bug, taskのどれかで値が存在する場合にfilterする。そのための各IDを格納するリストを定義。
    const issueList: number[] = [];
    if ( existsSelectedStory && parseInt(storyVal) !== 0 ) {
      issueList.push(parseInt(storyVal));
    };
    if ( existsSelectedBug && parseInt(bugVal) !== 0 ) {
      issueList.push(parseInt(bugVal));
    };
    if ( existsSelectedTask && parseInt(taskVal) !== 0 ) {
      issueList.push(parseInt(taskVal));
    };
    // 条件を満たすものをfilterして得られたものを新しいsubtaskとする。
    if ( issueList && newSubtasks && issueList.length !== 0 ) {
      newSubtasks = newSubtasks.filter( subtask => issueList.includes(subtask.issue_id_2) )
    }

    // filter結果をstateに保存
    setFilteredSubtasks(newSubtasks);
  };


  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-start">
        <LoginUserBar loginUser={loginUser} />
        <PageTitle titleName="工数登録ページ" />
        <FilterForm
          projects={projects} epics={filteredEpics} stories={filteredStories}
          bugs={filteredBugs} tasks={filteredTasks} eventFunc={filterValueChanged}
        />
        <SubtaskSelector subtasks={filteredSubtasks} fetchWorkloadsFromDb={fetchWorkloadsFromDb} />
        <WorkloadList workloads={workloads} setWorkloads={setWorkloads} />
        <JiraUploadButton />
      </main>
    </div>
  );
});

export default RegisterWorkload
