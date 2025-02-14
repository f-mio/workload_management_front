import { z } from 'zod'


export const WorkloadFormSchema = z.object({
  subtask_id: z
    .number().int().gte(0),
  user_id: z
    .number().int().gte(0),
  work_date: z.string().date(),
  workload_minute: z.number().gt(0),
  detail: z.string().min(0)
});


export type WorkloadFormState =
  | {
      errors?: {
        subtask_id?: string[]
        user_id?: string[]
        work_date?: string[]
        workload_minute?: string[]
        detail?: string[]
      }
    }
  | undefined;


export const WorkloadPutFormSchema = z.object({
  id: z
    .number().int().gte(0),
  subtask_id: z
    .number().int().gte(0),
  user_id: z
    .number().int().gte(0),
  work_date: z.string().date(),
  workload_minute: z.number().gt(0),
  detail: z.string().min(0)
});
  

export type WorkloadPutFormState =   | {
  errors?: {
    id?: string[]
    subtask_id?: string[]
    user_id?: string[]
    work_date?: string[]
    workload_minute?: string[]
    detail?: string[]
  }
};


export type ResisteredWorkload = {
  project_id: number
  project_name: string
  issue_id_1: number | null
  issue_name_1: string | null
  issue_id_2: number | null
  issue_name_2: string | null
  subtask_id: number
  subtask_name: string
  workload_id: number
  user_id: number
  user_name: string
  // work_date: string | Date | null
  work_date: string
  workload_minute: number
  detail: string
  update_timestamp: string | Date | null
  create_timestamp: string | Date | null
};


export type ThemeBarChartDataType = {
  theme: string
  workMonth: string
  load: number
};


export type UserBarChartDataType = {
  userName: string
  workMonth: string
  load: number
};
