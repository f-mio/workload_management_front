import { memo } from "react";
// コンポーネント
import { Issue } from "@/app/lib/types/jiraContents";


const IssueSelectForm = memo((
  {issues, issueName, color, eventFunc}: {issues: Issue[]|null, issueName: string, color: string, eventFunc: Function}
  ) => {

  return (
    <div className="w-1/2 py-1 flex fles-row items-center">
      <label className="w-1/4">{`　　${issueName}: `}</label>
      <select
        className={`w-3/4 bg-${color}`}
        name={`${issueName}-choice`}
        id={`${issueName}_select`}
        onChange={ e => {eventFunc()}}
      >
        <option key="0" value="0">
          ---------
        </option>
        {(issues?.map( (item) => (
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

export default IssueSelectForm;
