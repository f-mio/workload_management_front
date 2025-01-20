"use client"

export default function TopPageDescription() {
  return (
    <div className="flex flex-col align-top">
      <div className="text-xl pt-4 leading-8">
        本アプリケーションはJIRAに登録されているSubtaskに対して本App用DB内に工数を登録するアプリケーションです。<br />
        JIRA内のProjectおよびIssueの情報もApp用DBと同期させBIツール等で工数情報を可視化することも可能です。<br />
        (JIRAのIssueとは(エピック, ストーリー, バグ, タスク, サブタスクおよびカスタム課題のことです))<br />
        これら情報を適切に使用することで、期の終わりに発生する工数集計業務の効率化を計ることが目的のアプリケーションです。
      </div>
    </div>
  );
}
