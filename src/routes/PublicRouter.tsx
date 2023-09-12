import { ReactNode } from 'react'

interface PublicRouterProps {
  children: ReactNode
}
export const PublicRouter = ({ children }: PublicRouterProps) => {
  return <>{children}</>
}
