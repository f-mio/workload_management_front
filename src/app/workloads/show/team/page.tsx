"use client"

import { useState, useMemo, useEffect, useContext, memo } from "react";
import { redirect } from "next/navigation";
// コンポーネント
import LoginUserBar from "@/app/ui/common/login-user-bar";
import PageTitle from "@/app/ui/common/page-title";
import JiraUploadButton from "@/app/ui/workloads/jira-update-button";
import InputDateForm from "@/app/ui/common/input-date-form";
import { ThemeStackedBarChart, UserStackedBarChart } from "@/app/ui/workloads/show/stacked-bar-chart";
// 関数、コンテキスト
import { UserContext } from "@/app/lib/contexts/UserContext";
import { apiFetchSpecifyWorkloads } from "@/app/api/workloads";
// 型
import { User } from "@/app/lib/types/users";
import { ThemeBarChartDataType, UserBarChartDataType, 
  ResisteredWorkload, } from "@/app/lib/types/workloads";
import { Project } from "@/app/lib/types/jiraContents";


export default function ShowTeamWorkloads() {
  // ログイン状態を取得
  const loginUser = useContext<User>(UserContext);
  if (!loginUser) { redirect("/") };

  // 定数
  const lowerDateFormId = "lower_date_form",
    upperDateFormId = "upper_date_form";

  // Initial value
  const currentMonth = "",
    currentYear = "";
  const initLowerDate = "2025-01-01",
    initUpperDate = "2025-03-31";


  // stateの宣言 (工数、取得時期、プロジェクト、)
  const [lowerDate, setLowerDate] = useState<string>(initLowerDate);
  const [upperDate, setUpperDate] = useState<string>(initUpperDate);
  const [projects, setProjects] = useState<Project[]|null>(null);
  const [workloads, setWorkloads] = useState<ResisteredWorkload[]>([]);
  // const [users, setUsers] = useState<User[]|null>(null);
  const [pieChartData, setPieChartData] = useState<object[]>([]);
  const [themeStackBarChartData, setThemeStackBarChartData] = useState<ThemeBarChartDataType[]>([]);
  const [userStackBarChartData, setUserStackBarChartData] = useState<UserBarChartDataType[]>([]);
  const [tableData, setTableData] = useState<object[]>([]);
  const [isUpdating, setIsUpdating ] = useState<boolean>(false);

  /// /// /// ///
  // 関数定義

  // 工数取得メソッド
  async function fetchWorkloads() {
    const searchCondition = {lower_date: lowerDate, upper_date: upperDate};
    const workloadsRes = await apiFetchSpecifyWorkloads(loginUser, searchCondition);
    setWorkloads(workloadsRes);
  };

  // Pieチャート用のフィルター用メソッド
  const filterDataForPieChart = () => {
    console.log("Pie Chart用のフィルター")
    // setPieChartData()
  };

  // テーマ毎のスタックバーチャート用のフィルター用メソッド
  const filterDataForThemeBarChart = () => {
    if (!workloads || workloads.length === 0) {
      setUserStackBarChartData([])
      return
    };
    const newData: ThemeBarChartDataType[] = workloads.map( w => {
      return {
        // theme: `${w.issue_name_2} (${w.issue_name_1})`,
        theme: `${w.issue_name_1} (${w.project_name})`,
        workMonth: w.work_date.substring(0,7),
        load: w.workload_minute
      };
    });
    setThemeStackBarChartData(newData ? newData : []);
  };

  // ユーザ毎のスタックバーチャート用のフィルター用メソッド
  const filterDataForUserBarChart = () => {
    if (!workloads || workloads.length === 0) {
      setUserStackBarChartData([])
      return }
    const newData: UserBarChartDataType[] = workloads.map( w => {
      return {
        userName: `${w.user_name}`,
        workMonth: (w.work_date)?.toString().substring(0,7),
        load: w.workload_minute
      };
    });
    setUserStackBarChartData(newData)
  };

  // 表用のフィルター用メソッド
  const filterDataForTable = () => {
    console.log("表用のフィルター")
    // setTableData()
  };


  // useEffectを作成
  useEffect( () => {
    fetchWorkloads();
    console.log(workloads)
    }, [lowerDate, upperDate]
  );

  // 工数変更時にフィルター実行
  useEffect(filterDataForPieChart, [workloads]);
  useEffect(filterDataForThemeBarChart, [workloads]);
  useEffect(filterDataForUserBarChart, [workloads]);
  useEffect(filterDataForTable, [workloads]);

  // 関数のメモ化
  useMemo(filterDataForPieChart, []);
  useMemo(filterDataForThemeBarChart, []);
  useMemo(filterDataForUserBarChart, []);
  useMemo(filterDataForTable, []);


  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-start">
        <LoginUserBar loginUser={loginUser} />
        <PageTitle titleName="登録済み工数 確認ページ" />

        <div className="flex flex-row items-center">
          <InputDateForm formId={lowerDateFormId} dateValue={lowerDate} setStateFunc={setLowerDate} />
          <span className="mx-8">〜</span>
          <InputDateForm formId={upperDateFormId} dateValue={upperDate} setStateFunc={setUpperDate} />
        </div>

        {/* <div className="w-full flex flex-col justify-center items-center"> */}
        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-1/2 flex flex-col items-start">
            <ThemeStackedBarChart chartTitle="テーマ別工数" workloadData={themeStackBarChartData} />
          </div>
          <div className="w-1/2 flex flex-col items-start">
            <UserStackedBarChart chartTitle="ユーザ別工数" workloadData={userStackBarChartData} />
          </div>
        </div>
        <JiraUploadButton />
      </main>
    </div>
  );
};
