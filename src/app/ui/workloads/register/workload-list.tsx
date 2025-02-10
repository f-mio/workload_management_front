import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
// 型
import { ResisteredWorkload } from "@/app/lib/types/workloads"
import EditWorkloadIcon from "@/app/ui/workloads/edit/edit-workload-icon";
import RemoveWorkloadIcon from "@/app/ui/workloads/edit/remove-icon";


const WorkloadList = ({workloads}: {workloads: ResisteredWorkload[]|null}) => {

  const minute = workloads ? workloads.reduce((acc, curr) => acc + curr.workload_minute, 0) : 0
  return (
    <div className="flex flex-col w-full ps-6">
      <h3 className="w-full mb-1 text-2xl underline underline-offset-1">登録済み工数</h3>
      <div className="w-full ms-6">登録工数合計: {minute}分</div>
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
                <EditWorkloadIcon id={load.workload_id} heightClass="h-6" />
                <RemoveWorkloadIcon id={load.workload_id} heightClass="h-6" />
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
};

export default WorkloadList
