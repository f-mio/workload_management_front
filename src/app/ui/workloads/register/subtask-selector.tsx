"use client"

import { memo, useContext, useState, useActionState } from "react";
import { redirect } from "next/navigation";
// コンポーネント
import { Subtask } from "@/app/lib/types/jiraContents";
// 関数
import { UserContext } from "@/app/lib/contexts/UserContext";
import { postNewWorkload, apiFetchSpecifyWorkloads } from "@/app/api/workloads";
// 型
import { User } from "@/app/lib/types/users";
import { WorkloadFormState } from "@/app/lib/types/workloads";


const SubtaskSelector = memo(({subtasks, fetchWorkloadsFromDb}: {subtasks: Subtask[]|null, fetchWorkloadsFromDb: Function}) => {
  // ログインユーザ情報を取得
  const loginUser = useContext<User>(UserContext);
  // ログインしていない場合はトップページにリダイレクト
  if (!loginUser) { redirect("/") };

  const [formData, setFormData] = useState({
    subtask_id: 0,
    user_id: loginUser ? loginUser.id : 0,
    work_date: new Date().toISOString().split('T')[0],
    workload_minute: 0,
    detail: ""
  });


  /**
   * 工数登録ボタン押下後のアクション
   * @param state 
   * @param formData 
   */
  const postAction = async (state: WorkloadFormState, submitFormData: FormData) => {
    const res = await postNewWorkload(state, submitFormData);
    if (!res?.errors) {
      // フォームの値を初期化
      const newFormData = {...formData, workload_minute: 0, subtask_id: 0, detail: ""};
      setFormData(newFormData)
      // Workloadリストの更新 (再取得)
      fetchWorkloadsFromDb(newFormData.work_date);
    };
  };

  const [state, action, pending] = useActionState(postAction, undefined);

  // フォーム内容の変更時のハンドラ
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (e.target.name == "work_date") {
      fetchWorkloadsFromDb(e.target.value);
    };
  };

  return (
    <div className="w-full pt-1">
      <form action={action} className="w-full flex justify-center">
        <div className="w-5/6 flex flex-col">
          <div className="w-full min-h-[150px] max-h-60 flex flex-row flex-wrap overflow-y-auto p-4 border-2 rounded-2xl">
            {subtasks?.map( subtask => (
              <div
                className="w-1/3 py-1 flex flex-row"
                key={`subtask-${subtask.id}`}
              >
                <input
                  type="radio"
                  id={`subtask_choice_${subtask.id}`}
                  name="subtask_id"
                  value={subtask.id}
                  onChange={handleChange}
                />
                <div className="ps-2 text-wrap">
                  <label htmlFor={`subtask_choice_${subtask.id}`}>
                    {`[${subtask.status}] ${subtask.name}`}
                  </label>
                </div>
              </div>
              )
            )}
          </div>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row mt-3">
              <div className="w-1/2">
                <label htmlFor="work_date" className="w-24">日時:　</label>
                <input
                  type="date"
                  id="work_date"
                  name="work_date"
                  className="w-2/3"
                  value={formData.work_date}
                  onChange={handleChange}
                />
                {state?.errors?.work_date && <p className="ms-2 w-60 text-red-600">{state.errors.work_date}</p>}
              </div>
              <div className="w-1/2">
                <label htmlFor="workload_minute" className="w-24">工数:　</label>
                <input
                  type="number"
                  id="workload_minute"
                  name="workload_minute"
                  className="w-2/3"
                  value={formData.workload_minute}
                  onChange={handleChange}
                />
                {state?.errors?.workload_minute && <p className="ms-2 w-60 text-red-600">{state.errors.workload_minute}</p>}
              </div>
            </div>
            <div className="w-full mt-2 flex flex-row items-center">
              <label htmlFor="detail" className="w-12">詳細:　</label>
              <input
                id="detail"
                type="text"
                name="detail"
                placeholder="本日実施した作業内容を記入してください。"
                className="w-5/6 h-auto ms-1"
                value={formData.detail}
                onChange={handleChange}
              />
              {state?.errors?.detail && <p className="ms-2 w-60 text-red-600">{state.errors.detail}</p>}
            </div>

            <div className="hidden">
              <label htmlFor="user_id">ユーザID:</label>
              <input
                id="user_id"
                name="user_id"
                className="ms-2 w-60"
                value={formData.user_id}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-center mt-3">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              送信
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

export default SubtaskSelector;
