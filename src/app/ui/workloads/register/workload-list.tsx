"use client"

import { memo } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
// メソッド
import { deleteWorkload } from "@/app/api/workloads";
// 型
import { ResisteredWorkload } from "@/app/lib/types/workloads"
import EditWorkloadIcon from "@/app/ui/workloads/edit/edit-workload-icon";
import RemoveWorkloadIcon from "@/app/ui/workloads/edit/remove-icon";


const WorkloadList = memo(({workloads, setWorkloads}: {workloads: ResisteredWorkload[]|null, setWorkloads: Function}) => {

  // 指定日の全工数を計算
  const allWorkTimeMinute = workloads ? workloads.reduce((acc, curr) => acc + curr.workload_minute, 0) : 0;

  // 削除ボタン押下イベント
  const onClickAdditional = (workloadId: number) => {
    const newWorkloads = workloads?.filter(workload => workload.workload_id !== workloadId);
    setWorkloads(newWorkloads);
  }

  return (
    <div className="flex flex-col w-full ps-6">
      <div className="w-full ms-6 flex items-center">
        <ClockIcon className="h-8 text-gray-400" />
        <span className="ms-1 text-gray-500 text-2xl font-bold">{allWorkTimeMinute}分</span>
      </div>
      <div className="w-full mt-2 pb-2 flex flex-col border-2 rounded-xl ps-6">
        { ((workloads === null) || (workloads.length === 0)) && (
          <div className="ps-6 py-5 text-xl">指定日には登録された工数はありませんでした。</div>
        ) }
        { workloads?.map( (load) => (
          <div key={load.workload_id} className="flex flex-col py-2 w-full">
            <div className="flex flex-row w-full text-xs">
              {load.project_name}
              {load.issue_name_1 ? ` > ${load.issue_name_1}`: ""}
              {load.issue_name_2 ? ` > ${load.issue_name_2}`: ""}
              {` > ${load.subtask_name}`}
            </div>
            <div className="ms-6 mt-2 flex flex-row">
              <div className="flex flex-row">
                <EditWorkloadIcon workloadId={load.workload_id} heightClass="h-6" />
                <RemoveWorkloadIcon workloadId={load.workload_id} heightClass="h-6" onClickAdditional={onClickAdditional} />
              </div>
              <div className="ms-2">
                {load.detail} ({load.workload_minute}分)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
});

export default WorkloadList
