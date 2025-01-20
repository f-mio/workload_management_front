

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
