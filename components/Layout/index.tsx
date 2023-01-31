import { ReactNode } from 'react'
import Header from '../Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="dark:bg-dark min-h-screen bg-cultured bg-cover">
      <div className="max-w-3xl grid grid-cols-12 grid-flow-col space-x-6">
        <div className="col-span-1 -mr-6">
          <Header />
        </div>
        <div className="col-span-11">{children}</div>
      </div>
    </div>
  )
}
