import { ReactNode, useEffect } from 'react'
import Header from '../components/Header/Header'
import { readCookie } from '../utils/cookie'
import { useNavigate } from 'react-router-dom'

interface PrivateRouterProps {
  children: ReactNode
}
export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const navigate = useNavigate()

  const checkCorrectRole = () => {
    if (window.location.href.split('/').includes('helper') && readCookie('roles') === 'ROLE_HELPER') return true
    if (window.location.href.split('/').includes('owner') && readCookie('roles') === 'ROLE_OWNER') return true
    return false
  }

  useEffect(() => {
    if (!readCookie('tokenDHJO') || !checkCorrectRole()) {
      return navigate('/login')
    }
  }, [])

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>{children}</div>
      {/* <Footer /> */}
    </>
  )
}
