"use client"

import { memo } from "react"


const WorkloadForm = memo(
  ({state, action, formData, handleChange}:
      {state: any, action: string, formData: any, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}
  ) => {

  return (
    <form action={action} className="w-full flex justify-center">
      <div className="w-5/6 flex flex-col">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row mt-3">
            <div className="w-1/2">
              <label htmlFor="work_date" className="w-24">日時:　</label>
              <input
                type="date"
                id="work_date"
                name="work_date"
                className="w-2/3"
                value={formData.work_date}
                onChange={handleChange}
              />
              {state?.errors?.work_date && <p className="ms-2 w-60 text-red-600">{state.errors.work_date}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="workload_minute" className="w-24">工数:　</label>
              <input
                type="number"
                id="workload_minute"
                name="workload_minute"
                className="w-2/3"
                value={formData.workload_minute}
                onChange={handleChange}
              />
              {state?.errors?.workload_minute && <p className="ms-2 w-60 text-red-600">{state.errors.workload_minute}</p>}
            </div>
          </div>
          <div className="w-full mt-2 flex flex-row items-center">
            <label htmlFor="detail" className="w-12">詳細:　</label>
            <input
              id="detail"
              type="text"
              name="detail"
              placeholder="本日実施した作業内容を記入してください。"
              className="w-5/6 h-auto ms-1"
              value={formData.detail}
              onChange={handleChange}
            />
            {state?.errors?.detail && <p className="ms-2 w-60 text-red-600">{state.errors.detail}</p>}
          </div>

          <div className="hidden">
            <label htmlFor="id">ユーザID:</label>
            <input
              id="id"
              name="id"
              className="ms-2 w-60"
              value={formData.id}
              onChange={handleChange}
            />
            <label htmlFor="user_id">ユーザID:</label>
            <input
              id="user_id"
              name="user_id"
              className="ms-2 w-60"
              value={formData.user_id}
              onChange={handleChange}
            />
            <label htmlFor="subtask_id">サブタスクID:</label>
            <input
              id="subtask_id"
              name="subtask_id"
              className="ms-2 w-60"
              value={formData.subtask_id}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-center mt-3">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            修正
          </button>
        </div>
      </div>
    </form>
  );
});

export default WorkloadForm;
