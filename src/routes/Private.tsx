import { ReactNode } from 'react'
import Header from '../components/Header/Header'

interface PrivateRouterProps {
  children: ReactNode
}
export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
