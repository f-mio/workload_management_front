"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// 関数
import apiServerInfo from "@/config/serverConfig";
// 型
import { User } from "@/app/lib/types/users";
import { WorkloadFormState, WorkloadFormSchema,
         WorkloadPutFormState, WorkloadPutFormSchema } from "@/app/lib/types/workloads";


export async function apiFetchSpecifyWorkloads(loginUser: User|null, searchCondition: any) {
  // ログインしていない場合はトップへリダイレクト
  if (loginUser == null) { redirect("/") };

  // cookieを取得
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) { return; }
  // エンドポイント
  const endpoint = `${apiServerInfo["epGetWorkloadsUseCondition"]}`;
  // APIへアクセス
  const response = await axios.post(
    endpoint, searchCondition,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `access_token=${accessToken}`,
      }
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      return error
    });

  // 200番を超えるステータスの場合エラーを出力
  if (response.status >= 300) {
    const errorMsg = response?.data?.message
    return  {
        errors: {apiMessage: `${errorMsg}`},
    };
  };

  return response
};


export async function postNewWorkload (state: WorkloadFormState, formData: FormData) {
  // 必要なデータのみを抽出
  const validatedFields = WorkloadFormSchema.safeParse({
    subtask_id: Number(formData.get("subtask_id")),
    user_id: Number(formData.get("user_id")),
    work_date: formData.get("work_date"),
    workload_minute: Number(formData.get("workload_minute")),
    detail: formData.get("detail")
  });
  // 上記で方が合わない場合はエラーメッセージを返却
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  };

  // cookieを取得
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) { return; }
  // エンドポイント取得
  const endpoint = apiServerInfo["epPostWorkload"];
  // 送付データ取得
  const workloadData = validatedFields.data;
  // APIへアクセス
  const response = await axios.post(
      endpoint, workloadData,
      { withCredentials: true,
        headers: {
          'Cookie': `access_token=${accessToken}`,
        }
      })
      .then( res => res)
      .catch(function (error) {
        console.log(error);
        return null
      });

  // エラーが発生した場合、nullなので早期リターン
  if (response === null) { return null };

  const resData = {status: response.status, data: response.data}
  return resData

};


export async function putWorkload (state: WorkloadPutFormState, formData: FormData) {
  // 必要なデータのみを抽出
  const validatedFields = WorkloadPutFormSchema.safeParse({
    id: Number(formData.get("id")),
    subtask_id: Number(formData.get("subtask_id")),
    user_id: Number(formData.get("user_id")),
    work_date: formData.get("work_date"),
    workload_minute: Number(formData.get("workload_minute")),
    detail: formData.get("detail")
  });
  // 上記で方が合わない場合はエラーメッセージを返却
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  };

  // APIサーバへサインアップ処理を送信
  const workloadId = validatedFields.data.id;

  // cookieを取得
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) { return; }

  const endpoint = `${apiServerInfo["epUpdateWorkload"]}/${workloadId}`;
  const workloadData = validatedFields.data;
  const response = await axios.put(
      endpoint, workloadData,
      { withCredentials: true,
        headers: {
          'Cookie': `access_token=${accessToken}` }    
      })
      .then(res => res)
      .catch(function (error) {
        console.log(error);
        return null
      });

  // エラーが発生した場合、nullなので早期リターン
  if (response === null) { return null };

  const resData = {status: response.status, data: response.data}
  return resData
};


export async function deleteWorkload(workloadId: number) {

  // エンドポイントを取得
  const endpoint = `${apiServerInfo["epDeleteWorkload"]}/${workloadId}`;
  // cookieを取得
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) { return; }
  // APIへのアクセス
  const response = await axios.delete(
    endpoint,
    { withCredentials: true,
      headers: {
        'Cookie': `access_token=${accessToken}` }
    })
    .then( res => res )
    .catch(function (error) {
      console.log(error);
      return null
    });

  // エラーが発生した場合、nullなので早期リターン
  if (response === null) { return null };

  const resData = {status: response.status, data: response.data}

  return resData
};
