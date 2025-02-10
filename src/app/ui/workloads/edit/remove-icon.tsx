"use client"

import { memo } from "react"
import { XCircleIcon } from "@heroicons/react/24/solid";


const RemoveWorkloadIcon = memo( ( {id, heightClass} : {id: number|string, heightClass: string}) => {
  return (
    <button
      onClick={ () => {console.log(id)}}
      className={`${heightClass} mx-1`}
    >
      <XCircleIcon className="h-full text-red-600" />
    </button>
  );
});

export default RemoveWorkloadIcon;
