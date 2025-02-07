"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// 関数
import apiServerInfo from "@/config/serverConfig";
// 型
import { User } from "@/app/lib/types/users";
import { WorkloadFormState, WorkloadFormSchema } from "@/app/lib/types/workloads";


export async function apiFetchUserWorkload(loginUser: User|null) {

  if (loginUser == null) {
    redirect("/");
  }

  // エンドポイント
  const endpoint = `${apiServerInfo["epGetUserWorkloads"]}/${loginUser.id}`;

  const response = await axios.get(
    endpoint,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });

  // 200番を超えるステータスの場合エラーを出力
  if (response.status >= 300) {
    const errorMsg = response?.response?.data?.message
    return  {
        errors: {apiMessage: `${errorMsg}`},
    };
  };

  return response
};


export async function apiFetchSpecifyWorkload(loginUser: User|null, targetDate: string) {

  if (loginUser == null) { redirect("/") };

  // エンドポイント
  const endpoint = `${apiServerInfo["epGetWorkloadsUseCondition"]}`;

  const searchCondition = { specify_user_id: loginUser.id, target_date: targetDate}
  const response = await axios.post(
    endpoint, searchCondition,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
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
    const errorMsg = response?.response?.data?.message
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
  }

  // APIサーバへサインアップ処理を送信
  const endpoint = apiServerInfo["epPostWorkload"];
  const workloadData = validatedFields.data;
  const response = await axios.post(
      endpoint, workloadData,
      {withCredentials: true})
    .catch(function (error) {
      console.log(error);
      return null
    });

  // エラーが発生した場合、nullなので早期リターン
  if (response === null) { return null };

  // FastAPIからのCookieをブラウザに転送
  const cookieStore = await cookies();
  // Set-Cookieヘッダーからトークンを抽出
  const setCookiesList = response.headers?.["set-cookie"];
  if (setCookiesList) {
    const setCookiesStr = setCookiesList.join();
    // Bearer tokenの部分を抽出
    const tokenMatch = setCookiesStr.match(/Bearer\s+([^"]+)/);
    if (tokenMatch && tokenMatch[1]) {
      const access_token = `"Bearer ${tokenMatch[1]}"`;
      cookieStore.set({
        name: "access_token",
        value: access_token,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
      });
    };
  };
}

