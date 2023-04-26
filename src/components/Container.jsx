import clsx from 'clsx'

export function Container({ className, children, ...props }) {
  return (
    <div className={className} {...props}>
      <div className="lg:max-w-4xl">
        {children}
      </div>
    </div>
  )
}
