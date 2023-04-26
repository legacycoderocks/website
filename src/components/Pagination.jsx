import clsx from 'clsx'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

function pageUrl(pageNumber) {
  if (pageNumber == 1) {
    return "/"
  }

  return `/episodes/pages/${pageNumber}`
}

export function Pagination({ allPageNumbers, currentPage }) {
  // caveat! assumes that `allPageNumbers` contains at least 5 elements
  // scenarios:
  // * 1 [2] 3 4 5 ...
  // * ... 20 22 23 [24] 25
  // * ... 8 9 [10] 11 12 ...

  const showLeadingIndicator = currentPage > 5
  const showTrailingIndicator = currentPage <= (allPageNumbers.length - 5)
  let focusedPageNumbers = []
  if (!showLeadingIndicator) {
    focusedPageNumbers = allPageNumbers.slice(0, 5)
  } else if (!showTrailingIndicator) {
    focusedPageNumbers = allPageNumbers.slice(allPageNumbers.length - 5, allPageNumbers.length)
  } else {
    focusedPageNumbers = allPageNumbers.slice(currentPage - 3, currentPage + 2)
  }
  const showPrevious = currentPage != 1
  const showNext = currentPage != allPageNumbers.length

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        { showPrevious &&
          <a
            href={pageUrl(currentPage - 1)}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </a>
        }
      </div>

      <div className="hidden md:-mt-px md:flex">
        {showLeadingIndicator &&
          <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
            ...
          </span>
        }

        {focusedPageNumbers.map((value) => (
          <a
            key={value}
            href={pageUrl(value)} 
            className={clsx("inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium", value == currentPage && "border-brand-red-400 text-brand-red-500", value != currentPage && "text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700")}
          >
            {value}
          </a>
        ))}

        {showTrailingIndicator &&
          <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
            ...
          </span>
        }        
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        { showNext &&
          <a
            href={pageUrl(currentPage + 1)}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </a>
        }
      </div>
    </nav>
  )
}
