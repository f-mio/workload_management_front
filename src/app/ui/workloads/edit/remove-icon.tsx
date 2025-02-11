"use client"

import { memo } from "react"
import { XCircleIcon } from "@heroicons/react/24/solid";
// メソッド
import { deleteWorkload } from "@/app/api/workloads";


const RemoveWorkloadIcon = memo( ( {workloadId, heightClass} : {workloadId: number, heightClass: string}) => {

  return (
    <button
      onClick={ async () => { await deleteWorkload(workloadId)} }
      className={`${heightClass} mx-1`}
    >
      <XCircleIcon className="h-full text-red-600" />
    </button>
  );
});

export default RemoveWorkloadIcon;
