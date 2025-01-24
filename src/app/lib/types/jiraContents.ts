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
