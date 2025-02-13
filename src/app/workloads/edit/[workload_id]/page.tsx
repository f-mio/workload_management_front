"use client"

import { memo, useState, useContext, useEffect, useActionState, useMemo } from "react";
import { redirect, useRouter } from "next/navigation";
// コンポーネント
import { UserContext } from "@/app/lib/contexts/UserContext";
import PageTitle from "@/app/ui/common/page-title";
import LoginUserBar from "@/app/ui/common/login-user-bar";
import WorkloadForm from "@/app/ui/workloads/edit/workload-form";
import JiraUploadButton from "@/app/ui/workloads/jira-update-button";
import RemoveWorkloadButton from "@/app/ui/workloads/remove-button";
import BackButton from "@/app/ui/common/back-button";
// メソッド
import { putWorkload, deleteWorkload } from "@/app/api/workloads";
// 型
import { User } from "@/app/lib/types/users";
import { ResisteredWorkload } from "@/app/lib/types/workloads";
import { apiFetchSpecifyWorkloads } from "@/app/api/workloads";
import { WorkloadPutFormState } from "@/app/lib/types/workloads";


const EditWorkload = memo( ({ params, }: { params: Promise<{ workload_id: string }>}) => {

  // ログイン状態の場合userDataを取得
  const loginUser = useContext<User>(UserContext);
  // ログイン状態でない場合はトップページにリダイレクト
  if (!loginUser) { redirect("/"); }

  // routerの作成
  const router = useRouter();
  // workloadとIDのstateを作成
  const [workloadId, setWorkloadId] = useState<number|null>(null);
  const [workload, setWorkload] = useState<ResisteredWorkload | null>();

  // URLからIDを取得するメソッド
  async function fetchWorkloadIdFromUrl(params: Promise<{ workload_id: string }>) {
    const workloadIdInUrl = (await params).workload_id;
    return parseInt(workloadIdInUrl);
  };

  const [formData, setFormData] = useState({
    id: 0,
    subtask_id: 0,
    user_id: loginUser ? loginUser.id : 0,
    work_date: new Date().toISOString().split('T')[0],
    workload_minute: 0,
    detail: ""
  });

  // フォーム内容の変更時のハンドラ
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  /**
   * 工数登録ボタン押下後のアクション
   * @param state 
   * @param formData 
   */
  const putAction = async (state: WorkloadPutFormState, submitFormData: FormData) => {
    // 工数修正用のメソッドを実行
    const res = await putWorkload(state, submitFormData);
    // 成功時にwindow alertにメッセージを表示
    if (res && res?.status && res.status < 300) {
      alert(res.data.message);
      router.back();
    };
  };

  // ActionStateを作成
  const [state, action, pending] = useActionState(putAction, undefined);

  // URLに含まれるIDからWorkloadを取得
  async function fetchSpecifyWorkload(params: Promise<{ workload_id: string }>) {
    // idを取得
    const workloadIdInUrl = await fetchWorkloadIdFromUrl(params)
    // エンドポイントへ送付するデータを定義
    const searchCondition = {
      "workload_id": workloadIdInUrl,
      "is_target_project": true };
    // データのstateへの登録
    const apiResponse = await apiFetchSpecifyWorkloads(loginUser, searchCondition);
    // このエンドポイントは複数のものを返すリスト型なので、0番目のみを取得する
    const specifyWorkload = (apiResponse?.length !== 0) ? apiResponse[0] : null;

    // 指定された工数が見つからない場合は、トップへリダイレクト
    if (specifyWorkload === null) {redirect("/")};

    const workloadData = {
      id: specifyWorkload.workload_id,
      subtask_id: specifyWorkload.subtask_id,
      user_id: specifyWorkload.user_id,
      work_date: specifyWorkload.work_date,
      workload_minute: specifyWorkload.workload_minute,
      detail: specifyWorkload.detail }

    // stateへのデータ反映
    setWorkloadId(workloadIdInUrl);
    setWorkload(specifyWorkload);
    setFormData(workloadData);
  }

  // URLからIDを取得し、対象IDのWorkloadを取得する。
  useEffect(() => {
    fetchSpecifyWorkload(params);
  }, [])

  // 削除ボタン押下イベント
  const onClickRemove = async () => {
    // IDがない場合は何もしない
    if (workloadId === null) {return}
    // APIへアクセス
    const res = await deleteWorkload(workloadId);
    if ( res && res.status < 300 ) {
      // メッセージを送信し、前のページへリダイレクト。
      alert(res?.data?.message);
      router.back();
    }
  };

  // 関数のメモ化
  useMemo(onClickRemove, []);

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-start font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-start">
        <LoginUserBar loginUser={loginUser} />
        <PageTitle titleName={`工数編集ページ${workload ? ` (workload id: ${workload?.workload_id})`: ""}`} />


        <div className="w-full ms-5 mt-6 gap-4 flex flex-col items-start">
          <div className="ms-6 mt-2 flex flex-col justify-start">
            <div className="flex w-full text-md">
              {workload?.project_name}
              {workload?.issue_name_1 ? ` > ${workload.issue_name_1}`: ""}
              {workload?.issue_name_2 ? ` > ${workload.issue_name_2}`: ""}<br />
            </div>
            <div className="ms-6 mt-3 flex flex-row w-full text-xl">
              {`サブタスク名：　${workload?.subtask_name}`}
            </div>
          </div>

          <WorkloadForm state={state} action={action} formData={formData} handleChange={handleChange} />

          <div className="ms-6 mt-6 flex flex-row justify-between gap-28">
            <BackButton />
            <RemoveWorkloadButton clickEvent={onClickRemove} />
          </div>

        </div>
        <JiraUploadButton />
      </main>
    </div>
  );
});

export default EditWorkload;
