import { ReactNode } from 'react'
import Header from '../Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto dark:bg-dark min-h-screen bg-cultured bg-cover">
      <div className="max-w-2xl mx-auto px-8">
        <Header />
        <div className="py-2 grid place-items-center">{children}</div>
      </div>
    </div>
  )
}
