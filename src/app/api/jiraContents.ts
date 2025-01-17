"use server"

import axios from "axios";
import { cookies } from "next/headers";
import apiServerInfo from "@/config/serverConfig";
import { redirect } from "next/navigation";


/**
 * Jira最新情報を取得して、ローカルDBのprojectとissueを全更新するAPI
 */
export async function apiUploadAllJiraContent() {
  // エンドポイント
  const endpoint = apiServerInfo["epUpdateAllIssues"];
  // FastAPIでの全更新エンドポイントへアクセス
  await axios.get(endpoint)
    .catch(function (error) {
      console.log(error);
      return null
    });
}
