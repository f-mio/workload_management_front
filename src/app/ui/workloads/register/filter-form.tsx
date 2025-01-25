import { memo } from "react";
import { BoltIcon, BookmarkIcon, BugAntIcon, CheckIcon } from "@heroicons/react/24/solid";
// コンポーネント
import ProjectSelectForm from "@/app/ui/workloads/register/project-select-form";
import IssueSelectForm from "@/app/ui/workloads/register/issue-select-form";
// 型
import { Issue, Project } from "@/app/lib/types/jiraContents";

const FilterForm = memo((
    { projects, epics, stories, bugs, tasks, eventFunc }:
    { projects: Project[]|null, epics: Issue[]|null, stories: Issue[]|null,
      bugs: Issue[]|null, tasks: Issue[]|null, eventFunc: Function }
  ) => {

  return (
    <div className="w-3/4">
      <div className="flex flex-col justify-start w-full">
        <ProjectSelectForm projects={projects} eventFunc={eventFunc} />
      </div>
      {/* project選択されている場合のに下記を表示するほうが良いと思われる。 */}
      <div className="flex flex-row flex-wrap justify-center w-full">
        {/* TODO 2列均等に配列する。 labelもつける */}
        <IssueSelectForm issues={epics} issueName="epic" color="violet-200" eventFunc={eventFunc} />
        <IssueSelectForm issues={stories} issueName="story" color="green-200" eventFunc={eventFunc} />
        <IssueSelectForm issues={bugs} issueName="bug" color="red-200" eventFunc={eventFunc} />
        <IssueSelectForm issues={tasks} issueName="task" color="blue-200" eventFunc={eventFunc} />
      </div>
    </div>
  );
});

export default FilterForm;
