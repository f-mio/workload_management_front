import Link from "next/link"

export default function UserNavLinks() {
  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      <li className="mb-2">[TODO: リンク] 登録情報修正</li>
      <li className="mb-2"><Link href="/users/signup">ユーザ登録</Link></li>
    </ol>
  )
}
