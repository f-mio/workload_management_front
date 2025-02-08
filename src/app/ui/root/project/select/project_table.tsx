"use client"

import { memo } from "react"
// 型
import { ProjectFromJira } from "@/app/lib/types/jiraContents"

const ProjectTable = memo((
    {projects, onChangeChkbox}: {projects: ProjectFromJira[]|null, onChangeChkbox: Function }
  ) => {
  return (
    <div className="w-full flex flex-row justify-center">
      { (projects === null) && (<p>プロジェクトが見つかりませんでした。Jiraの登録を確認してください。</p>)}
      { (projects !== null) && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-black text-sky-100">
            <thead className="text-xs text-white bg-sky-300 border-b border-sky-200 dark:text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  有効チェック
                </th>
                <th scope="col" className="px-6 py-3">
                  プロジェクト
                </th>
              </tr>
            </thead>
            <tbody>
              {projects?.map(project => (
                <tr key={project.id} className="px-6 py-4 font-medium text-black whitespace-nowrap bg-sky-200 border-sky-200 hover:bg-sky-400">
                  <td key={project.id} className=" border-sky-200">
                    <div className="w-full flex flex-row justify-center items-center">
                      <input
                        type="checkbox" name={project.name}
                        onChange={ (e) => {onChangeChkbox(project)} }
                        checked={ project.is_target === true }
                        className="w-8 h-8 rounded-md"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xl">{project.name}</span>&nbsp;&nbsp;&nbsp;(key: {project.jira_key})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
})

export default ProjectTable;
