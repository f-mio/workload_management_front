"use client"

import { memo } from "react";


const Description = memo(() => {
  return (
    <div className="w-full mt-3 ms-4 flex flex-row text-xl">
      Jira内で登録されているprojectを本アプリケーションで使用するかどうかを選択して設定するためのページです。<br />
      チェックマークが付けられているものは、アプリケーションを通じてユーザが確認できるものになります。
    </div>
  )
});

export default Description;
