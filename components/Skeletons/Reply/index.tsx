export default function ReplySkeleton({ count = 1 }) {
  const countArray = Array.from(Array(count))

  return (
    <>
      {countArray.map(() => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={Math.random()}
          className="mb-9"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-richblack dark:bg-cultured h-12 w-12" />
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4" />
                <div className="h-2 bg-richblack dark:bg-cultured w-1/4" />
                <div className="h-2 bg-gray-700 dark:bg-gray-400 w-1/4" />
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-richblack dark:bg-cultured" />
                <div className="h-2 bg-richblack dark:bg-cultured" />
                <div className="h-2 bg-richblack dark:bg-cultured" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  )
}
