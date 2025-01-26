import { memo } from "react";
// コンポーネント
import { Project } from "@/app/lib/types/jiraContents";

const ProjectSelectForm = memo((
    {projects, eventFunc}: {projects: Project[] | null, eventFunc: any}
  ) => {

  return (
    <div className="w-full flex flex-row items-center">
      <label className="w-1/3 me-3 text-end">{`プロジェクト:`}</label>
      <select
        name="project-choice"
        id="project_select"
        className="w-1/2 rounded-md"
        onChange={e =>{eventFunc()}}
        // onMouseDown={e =>{eventFunc()}}
      >
        <option key="0" value="0">
          ---------
        </option>
        {(projects?.map( (item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        )))};
      </select>
    </div>
  );
});

export default ProjectSelectForm;
