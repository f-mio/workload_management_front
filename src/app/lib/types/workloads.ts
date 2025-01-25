import { z } from 'zod'


export type Workload = {
  id: number
  subtask_id: number
  user_id: number
  work_date: string | Date | null
  workload_minute: number
  detail: string
  update_timestamp: string | Date | null
  create_timestamp: string | Date | null
};


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
