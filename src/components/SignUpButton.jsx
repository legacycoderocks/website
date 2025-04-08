export function SignUpButton({href, children}) {
  return (
    <div className="not-prose mb-5">
      <a
        href={href}
        className="rounded-md bg-brand-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-600"
      >
        {children}
      </a>
    </div>
  )
}
