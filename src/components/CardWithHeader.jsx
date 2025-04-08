export function CardWithHeader({title, children}) {
  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow my-4 mb-6">
        <div className="not-prose px-4 py-5 sm:px-6 bg-brand-yellow-400">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h3>
        </div>
        <div className="px-4 py-0">
          {children}
        </div>
      </div>
    </>
  )
}
