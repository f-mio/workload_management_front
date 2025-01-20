
/**
 * @param {string}: titleName ページのタイトル
 * @returns 
 */
export default function PageTitle({titleName}: {titleName: string}) {
  return (
    <h2 className="w-full text-3xl underline underline-offset-1 mb-3">
      {titleName}
    </h2>
  )
}
