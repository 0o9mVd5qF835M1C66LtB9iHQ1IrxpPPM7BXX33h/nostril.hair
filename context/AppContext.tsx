import { createContext, useContext, useMemo, useState } from 'react'

interface Context {
  privkey: string
  setPrivkey: (_privKey: string) => void
  pubkey: string
  setPubkey: (_pubkey: string) => void
}

const AppContext = createContext({} as Context)

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [privkey, setPrivkey] = useState<string>('')
  const [pubkey, setPubkey] = useState<string>('')

  const value = useMemo(
    () => ({
      privkey,
      setPrivkey,
      pubkey,
      setPubkey
    }),
    [privkey, pubkey]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
