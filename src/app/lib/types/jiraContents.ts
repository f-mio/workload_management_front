import { boolean } from "zod"


export type Project = {
  id: number
  name: string
  jira_key: string
  description: string
  is_target: Boolean
  update_timestamp: string | Date | null
  create_timestamp: string | Date | null
};


export type ProjectFromJira = {
  id: number
  name: string
  jira_key: string
  description: string
  is_target: Boolean
};


export type Issue = {
  id: number
  name: string
  project_id: number
  parent_issue_id: number | null
  type: string
  is_subtask: boolean
  status: string
  limit_date: | null
  description: string
  update_timestamp: string | Date | null
  create_timestamp: string | Date | null
};


export type SubtaskWithParents = {
  subtask_id: number
  subtask_type: string
  subtask_name: string
  subtask_status: string
  limit_date: string | Date | null
  description: string
  project_id: number
  project_name: string
  issue_id_1: number
  issue_type_1: string
  issue_name_1: string
  issue_id_2: number
  issue_type_2: string
  issue_name_2: string
  update_timestamp: string | Date | null
  create_timestamp: string | Date | null
};


/**
 * 廃止予定
 */
export type Subtask = {
  id: number
  name: string
  project_id: number
  parent_issue_id: number | null
  type: string
  status: string
  limit_date: | null
  description: string
  path: string
  update_timestamp: string | Date | null
  create_timestamp: string | Date | null
};
