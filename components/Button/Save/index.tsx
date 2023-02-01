interface Props {
  type?: 'button' | 'submit' | 'reset'
  text: string
  onClick: () => void
}

export default function SaveButton({ type = 'button', text, onClick }: Props) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className="inline-flex justify-center rounded-md border border-transparent bg-forlightgreen dark:bg-fordarkgreen py-2 px-4 text-sm font-medium text-white shadow-sm hover:opacity-90"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
