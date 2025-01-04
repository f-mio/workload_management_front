"use server"

import axios from "axios";
import apiServerInfo from "@/config/serverConfig"
import { SignupFormSchema, SignUpFormState } from '@/app/lib/schema/users'


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
  const message = await axios.post(endpoint, userData)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  // [TODO] JWT Tokenの発行
  return message
}


export async function login(formData: FormData) {
  // 必要なデータのみを抽出
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  // APIサーバへサインアップ処理を送信
  const endpoint = apiServerInfo["epLogin"];
  const message = await axios.post(endpoint, loginData)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(message)

  return message
}
