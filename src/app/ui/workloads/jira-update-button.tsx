
import { apiUploadAllJiraContent } from "@/app/api/jiraContents";

const JiraUploadButton = () => {
  return (
    <button
      className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-red-200 p-3 text-sm font-medium hover:bg-red-400 hover:text-neutral-900 md:flex-none md:justify-start md:p-2 md:px-5"
      onClick={() =>{apiUploadAllJiraContent()}}
    >
      Jira情報更新
    </button>
  );
}

export default JiraUploadButton;
