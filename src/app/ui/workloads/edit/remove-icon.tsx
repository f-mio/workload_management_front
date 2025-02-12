"use client"

import { memo } from "react"
import { TrashIcon } from "@heroicons/react/24/solid";
// メソッド
import { deleteWorkload } from "@/app/api/workloads";


const RemoveWorkloadIcon = memo( ( {workloadId, heightClass, onClickAdditional} : {workloadId: number, heightClass: string, onClickAdditional: Function | null}) => {

  const onClickEvent = async (workloadId: number) => {
    // IDがない場合は何もしない
    if (workloadId === null) {return}
    // APIへアクセス
    const res = await deleteWorkload(workloadId);
    if ( res && res.status < 300 ) {
      // メッセージを送信し、前のページへリダイレクト。
      alert(res?.data?.message);
      if (onClickAdditional !== null) {
        onClickAdditional(workloadId)}
    }
  }
  return (
    <button
      onClick={ async () => { onClickEvent(workloadId)} }
      className={`${heightClass} mx-1`}
    >
      <TrashIcon className="h-full text-red-600" />
    </button>
  );
});

export default RemoveWorkloadIcon;
