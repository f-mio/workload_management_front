"use client"

import { memo } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
// コンポーネント
import { apiUploadAllJiraContent } from "@/app/api/jiraContents";


const JiraUploadButton = memo(() => {

  async function clickEvent() {
    // エンドポイントにアクセスし、JIRAとDBを同期させる。
    await apiUploadAllJiraContent();
    // ページのリロード  ([TODO] Next.jsにあったリロードを適用したい)
    window.location.reload();
  };

  return (
    <div className="w-full flex flex-row my-4 justify-center">
      <button
        className="flex w-48 h-[48px] grow items-center justify-center gap-2 rounded-md bg-red-200 p-3 font-medium hover:bg-red-400 hover:text-neutral-900 md:flex-none md:justify-center md:p-2 md:px-5"
        onClick={clickEvent}
      >
        <p><ArrowPathIcon className="h-10" /></p>
        <p className="text-center">Jira更新</p>
      </button>
    </div>
  );
});

export default JiraUploadButton;
