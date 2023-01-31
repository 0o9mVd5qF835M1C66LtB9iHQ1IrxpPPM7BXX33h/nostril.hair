import classnames from 'classnames'

interface Props {
  title: string | JSX.Element
  className?: string
}

export default function Title({ title, className }: Props) {
  return (
    <div
      className={classnames('text-4xl dark:text-white flex justify-left font-semibold', className)}
    >
      {title}
    </div>
  )
}
