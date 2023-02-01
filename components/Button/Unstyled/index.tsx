interface Props {
  type?: 'button' | 'submit' | 'reset'
  text: string
  onClick: () => void
}

export default function UnstyledButton({ type = 'button', text, onClick }: Props) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className="inline-flex items-center space-x-2 rounded-lg border border-gray-200 dark:border-gray-900 bg-cultured dark:bg-nero px-4 py-2 text-sm font-medium dark:text-cultured text-richblack hover:bg-gray-100 dark:hover:opacity-90"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
