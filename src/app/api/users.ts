"use server"

import axios from "axios";
import { cookies } from "next/headers";
import apiServerInfo from "@/config/serverConfig"
import {
  SignupFormSchema, SignUpFormState,
  LoginFormSchema, LoginFormState } from '@/app/lib/schema/users'


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
  const message = await axios.post(
      endpoint, userData,
      {withCredentials: true})
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  // [TODO] JWT Tokenの発行
  return message
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
    }
  );

  // FastAPIからのCookieをブラウザに転送
  const cookieStore = await cookies();
  
  // Set-Cookieヘッダーからトークンを抽出
  const setCookieHeader = response.headers["set-cookie"]?.[0];
  if (setCookieHeader) {
    // Bearer tokenの部分を抽出
    const tokenMatch = setCookieHeader.match(/Bearer\s+([^"]+)/);
    if (tokenMatch && tokenMatch[1]) {
      // const token = `"Bearer ${tokenMatch[1]}"`;
      const token = `"Bearer ${tokenMatch[1]}"`;

      cookieStore.set({
        name: "access_token",
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
      });
    }
  }

  return response.data;
}
