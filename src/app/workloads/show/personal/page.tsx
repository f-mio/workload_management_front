"use client"

import { useState, useContext, useEffect, useMemo } from "react";
import { redirect } from "next/navigation";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table';
// コンポーネント
import LoginUserBar from "@/app/ui/common/login-user-bar";
import PageTitle from "@/app/ui/common/page-title";
import JiraUploadButton from "@/app/ui/workloads/jira-update-button";
// 関数、コンテキスト
import { UserContext } from "@/app/lib/contexts/UserContext";
import { apiFetchSpecifyWorkloads } from "@/app/api/workloads";
// 型
import { User } from "@/app/lib/types/users";
import { ResisteredWorkload } from "@/app/lib/types/workloads";



interface mrtDataType {
  id: number,
  project: string,
  issue_name_1: string,
  issue_name_2: string,
  subtask: string,
  minute: number,
  detail: string
}


export default function PersonalWorkloads() {
  // ログイン状態を取得
  const loginUser = useContext<User>(UserContext);
  if (!loginUser) { redirect("/") };

  // stateを作成
  const [workloads, setWorkloads] = useState<ResisteredWorkload[]|null>(null);
  const [mrtData, setMrtData] = useState<mrtDataType[]>([])
  const [isUpdating, setIsUpdating] = useState<Boolean>(false);


  // /// /// ///
  // 関数定義

  // 工数取得メソッド
  async function fetchWorkloads() {
    const searchCondition = {lower_date: "2025-01-01", upper_date: "2025-08-31"};
    const workloadsRes = await apiFetchSpecifyWorkloads(loginUser, searchCondition);
    setWorkloads(workloadsRes);

    const newMrtData: mrtDataType[] = workloadsRes.map(
      data => {return {
        id: data.workload_id,
        project: data.project_name,
        issue_name_1: data.issue_name_1,
        issue_name_2: data.issue_name_2,
        subtask: data.subtask_name,
        minute: data.workload_minute,
        detail: data.subtask_name }
    });
    if (newMrtData) { setMrtData(newMrtData) }
  };


  // エンドポイントからproject一覧の取得
  useEffect(
    ()=> {
      fetchWorkloads()
    },
    []
  )

  const columns = useMemo<MRT_ColumnDef<mrtDataType>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorKey: 'project',
        header: 'プロジェクト名',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorKey: 'issue_name_1',
        header: '課題第1階層',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorKey: 'issue_name_2',
        header: '課題第2階層',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorKey: 'subtask',
        header: 'サブタスク',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      {
        accessorKey: 'minute',
        header: '工数',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
      // {
      //   accessorFn: (originalRow) => parseInt(originalRow.minute),
      //   id: 'age',
      //   header: '工数',
      //   Header: <i style={{ color: 'red' }}>Age</i>,
      //   Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>,
      // },
      {
        accessorKey: 'detail',
        header: '実施内容',
        muiTableHeadCellProps: { style: { color: 'green' } },
        enableHiding: false,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    data: mrtData,
    columns: columns,
    // enableRowSelection: true,
    // enableColumnOrdering: true,
    // enableGlobalFilter: false,
  });


  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-12 row-start-2 items-start">
        <LoginUserBar loginUser={loginUser} />
        <PageTitle titleName="登録済み工数 個人工数確認ページ" />

        <div className="w-full mt-3 flex flex-col">
          <h3 className="w-full ms-6 text-2xl underline">ユーザ別工数</h3>
          <div className="w-full mt-3 flex flex-row justify-center">
          </div>
        </div>

        <div className="w-full my-3 flex flex-col">
          <h3 className="w-full ms-6 text-2xl underline">登録工数</h3>
          <div className="w-full mt-3 flex flex-row justify-center">
            <div className="w-5/6">
              <MaterialReactTable
                table={table}
              />
            </div>
          </div>
        </div>

        <JiraUploadButton />
      </main>
    </div>
  );
};
