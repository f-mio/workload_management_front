"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// 関数
import apiServerInfo from "@/config/serverConfig";
// 型
import { User } from "@/app/lib/types/users";
import { Project, Issue, Subtask, ProjectFromJira, SubtaskWithParents } from "@/app/lib/types/jiraContents";

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


const apiPutProjectActivate = async (project: ProjectFromJira) => {
  // エンドポイント
  const endpoint = apiServerInfo["epPutProjectRoot"];
  // エンドポイントへ投げるデータを作成
  const requestData = {...project};
  // エンドポイントへアクセス
  await axios.put(endpoint, requestData)
}


/**
 * ローカルDBからProjectを取得するAPI
 * @param {null}
 * @returns {object} : projects
 */
const apiFetchProjects = async(): Promise<Project[] | null> => {
  // エンドポイント
  const endpoint = apiServerInfo["epGetProjectsRoot"];
  // エンドポイントからprojectを取得
  const projects = await axios.get(endpoint)
    .then(function (response) {
      return response.data
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return projects
};


/**
 * ローカルDBからProjectを取得するAPI
 * @param {null}
 * @returns {object} : projects
 */
const apiFetchAllProjects = async(): Promise<Project[] | null> => {
  // エンドポイント
  const endpoint = apiServerInfo["epGetProjectsRoot"];
  // エンドポイントからprojectを取得
  const projects = await axios.get(endpoint)
    .then(function (response) {
      return response.data
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return projects
};


/**
 * ローカルDBからIssueを取得するAPI
 * @param {null}
 * @returns {object} : issues
 */
const apiFetchIssues = async(): Promise<Issue[] | null> => {
  // エンドポイント
  const endpoint = apiServerInfo["epGetIssues"];
  // エンドポイントからissueを取得
  const issues = await axios.get(endpoint)
    .then(function (response) {
      return response.data
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return issues;
};


/**
 * ローカルDBからSubtaskを取得するAPI
 * @param {null}
 * @returns {object} : subtasks
 */
const apiFetchSubtasks = async(): Promise<SubtaskWithParents[] | null> => {
  // エンドポイント
  const endpoint = apiServerInfo["epGetSubtasks"];
  // エンドポイントからsubtaskを取得
  const subtasks = await axios.get(endpoint)
    .then(function (response) {
      return response.data
    })
    .catch(error => {
      console.log(error);
      return null;
    });

  return subtasks;
};


export {
  apiFetchProjects,
  apiFetchAllProjects,
  apiPutProjectActivate,
  apiFetchIssues, 
  apiFetchSubtasks
};
