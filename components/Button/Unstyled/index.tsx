'use client'

import classNames from 'classnames'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  text: string
  onClick: () => void
  disabled?: boolean
}

export default function UnstyledButton({
  type = 'button',
  text,
  onClick,
  disabled = false
}: Props) {
  return (
    <button
      disabled={disabled}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames(
        'inline-flex items-center space-x-2 rounded-lg border border-gray-200 dark:border-gray-900 bg-cultured dark:bg-nero px-4 py-2 text-sm font-medium dark:text-cultured text-richblack hover:bg-gray-100 dark:hover:opacity-90'
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
