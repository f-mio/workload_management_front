"use client"

import { memo } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

const RemoveWorkloadButton = memo(({clickEvent}: {clickEvent: Function}) => {
  return (
    <button
      onClick={() => {clickEvent()}}
      className="ms-2 px-6 py-3 button rounded-full text-sm bg-red-400 flex flex-row items-center"
    >
      <TrashIcon
        className="h-6 text-white"
      />
      <div className="ms-2 items-center">
        削除
      </div>
    </button>
  );
})

export default RemoveWorkloadButton;
