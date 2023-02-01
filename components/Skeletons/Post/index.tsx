export default function PostSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from(Array(count)).map((iterator) => (
        <li key={iterator} className="border-0 border-t dark:border-gray-700 px-4 py-6">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-12 w-12" />
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4" />
                <div className="h-2 bg-slate-700 w-1/3" />
                <div className="h-2 bg-slate-700 w-1/4" />
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-slate-700" />
                <div className="h-2 bg-slate-700" />
                <div className="h-2 bg-slate-700" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  )
}
