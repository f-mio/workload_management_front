import { apiUploadAllJiraContent } from "@/app/api/jiraContents";
import { ArrowPathIcon } from "@heroicons/react/24/outline";


const JiraUploadButton = () => {
  return (
    <button
      className="flex w-36 h-[36px] grow items-center justify-center gap-2 rounded-md bg-red-200 p-3 text-sm font-medium hover:bg-red-400 hover:text-neutral-900 md:flex-none md:justify-start md:p-2 md:px-5"
      onClick={() =>{apiUploadAllJiraContent()}}
    >
      <ArrowPathIcon className="h-6" />
      Jira更新
    </button>
  );
}

export default JiraUploadButton;
