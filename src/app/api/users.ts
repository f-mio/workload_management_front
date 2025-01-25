"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// 関数
import apiServerInfo from "@/config/serverConfig";
// 型
import {
  SignupFormSchema, SignUpFormState,
  LoginFormSchema, LoginFormState } from '@/app/lib/types/users';


/**
 * サインアップ用のメソッド
 * @param state 
 * @param formData 
 * @returns 
 */
export async function signup(state: SignUpFormState, formData: FormData) {
  // 必要なデータのみを抽出
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    family_name: formData.get("family_name"),
    first_name: formData.get("first_name"),
    email: formData.get("email"),
    password: formData.get("password")
  })
  // 上記で方が合わない場合はエラーメッセージを返却
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // APIサーバへサインアップ処理を送信
  const endpoint = apiServerInfo["epSignUp"];
  const userData = validatedFields.data
  const response = await axios.post(
      endpoint, userData,
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
      redirect("/")
    }
  }
  return null;
}


/**
 * ログイン用メソッド
 * @param state 
 * @param formData 
 * @returns 
 */
export async function login(state: LoginFormState, formData: FormData) {
  // 必要なデータのみを抽出
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  // 上記で方が合わない場合はエラーメッセージを返却
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // ログイン情報をAPIサーバに送信
  const endpointLogin = apiServerInfo["epLogin"];
  const loginData = validatedFields.data;
  const response = await axios.post(
    endpointLogin, 
    loginData,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function (response) {
      return response
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
  }

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
    }
  }
  // return response.data;
}


/**
 * ログイン用メソッド
 */
export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
}


/**
 * ローカルDBから登録済みユーザ一覧を取得するAPI
 * @param {null}
 * @returns {object} : subtasks
 */
const apiFetchUsers = async() => {
  // エンドポイント
  const endpoint = apiServerInfo["epGetAllUser"];
  const users = await axios.get(endpoint)
    .then(function (response) {
      return response.data
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  
  return users;
};

export {
  apiFetchUsers
}
