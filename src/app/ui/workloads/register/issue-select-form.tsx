import { memo } from "react";
// コンポーネント
import { Issue } from "@/app/lib/types/jiraContents";
import { BoltIcon, CheckIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";


const IssueSelectForm = memo((
  {issues, issueName, color, eventFunc}: {issues: Issue[]|null, issueName: string, color: string, eventFunc: Function}
  ) => {

  return (
    <div className="w-1/2 py-1 flex fles-row items-center">
      <label className="w-1/4 flex flex-row items-center">
        {issueName === "epic" ? <BoltIcon className="h-8 mx-4 border rounded bg-violet-500 text-neutral-50"/> : null}
        {issueName === "story" ? <BookmarkIcon className="h-8 mx-4 border rounded stroke-2 bg-emerald-500 text-neutral-50" /> : null}
        {issueName === "bug" ? <svg className="h-8 mx-4 border rounded bg-orange-600" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="25" fill="white"/></svg> : null}
        {issueName === "task" ? <CheckIcon className="h-8 mx-4 border rounded stroke-2 bg-sky-500 text-neutral-50" /> : null}
        {`${issueName}`}
      </label>
      <select
        className={`w-3/4 ${color} rounded-md`}
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
