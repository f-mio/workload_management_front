"use server"

import axios from "axios";
import { cookies } from "next/headers";
import apiServerInfo from "@/config/serverConfig";
import { redirect } from "next/navigation";
import { User } from "@/app/lib/types/users";
import { Project, Issue, Subtask } from "@/app/lib/types/jiraContents";


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


/**
 * ローカルDBからProjectを取得するAPI
 * @param {null}
 * @returns {object} : projects
 */
const apiFetchProjects = async(): Promise<Project[] | null> => {
  // エンドポイント
  const endpoint = apiServerInfo["epGetProjects"];
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
const apiFetchSubtasks = async(): Promise<Subtask[] | null> => {
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
  apiFetchIssues, 
  apiFetchSubtasks
};
