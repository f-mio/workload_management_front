"use client"

import { memo } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";


const BackButton = memo( () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {router.back()}}
      className="p-3 button rounded-full bg-sky-400 flex flex-row items-center"
    >
      <ArrowUturnLeftIcon
        className="h-6 text-white"
      />
      <div className="ms-2 items-center">
        戻る
      </div>
    </button>
  );
});

export default BackButton;
