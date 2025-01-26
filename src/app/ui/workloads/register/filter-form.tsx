import { memo } from "react";
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
    <div className="w-full flex flex-col items-center">
      <div className="w-3/4 flex flex-col justify-center">
        <ProjectSelectForm projects={projects} eventFunc={eventFunc} />
      </div>
      {/* project選択されている場合のに下記を表示するほうが良いと思われる。 */}
      <div className="w-3/4 pt-2 flex flex-row flex-wrap justify-center">
        {/* TODO 2列均等に配列する。 labelもつける */}
        <IssueSelectForm issues={epics} issueName="epic" color="bg-violet-200" eventFunc={eventFunc} />
        <IssueSelectForm issues={stories} issueName="story" color="bg-emerald-200" eventFunc={eventFunc} />
        <IssueSelectForm issues={bugs} issueName="bug" color="bg-red-200" eventFunc={eventFunc} />
        <IssueSelectForm issues={tasks} issueName="task" color="bg-blue-200" eventFunc={eventFunc} />
      </div>
    </div>
  );
});

export default FilterForm;
