
export default function TopPageDescription() {
  return (
    <div className="flex flex-col align-top">
      <h2 className="text-3xl underline underline-offset-1 pt-4">本アプリケーションについて</h2>
      <div className="text-xl pt-2">
        本アプリケーションはJIRAに登録されているSubtaskに対して本App用DB内に工数を登録するアプリケーションです。<br />
        JIRA内のProjectおよびIssueの情報もApp用DBと同期させBIツール等で工数情報を可視化することも可能です。<br />
        (JIRAのIssueとは(エピック, ストーリー, バグ, タスク, サブタスクおよびカスタム課題のことです))<br />
        これら情報を適切に使用することで、期の終わりに発生する工数集計業務の効率化を計ることが目的のアプリケーションです。
      </div>

      {/* <h2 className="text-3xl underline underline-offset-1 pt-4">[TODO]アプリケーション内リンク</h2>
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] pt-2 ps-2">
        <li className="mb-2">[TODO：リンク] 工数登録</li>
        <li className="mb-2">[TODO：リンク] 登録情報可視化 (個人)</li>
        <li className="mb-2">[TODO：リンク] 登録情報可視化 (チーム)</li>
        <li className="mb-2">[TODO：リンク] ログイン or ログアウト</li>
      </ol> */}
    </div>
  );
}
