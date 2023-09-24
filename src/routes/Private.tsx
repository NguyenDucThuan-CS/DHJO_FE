import { ReactNode } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
//import { makeStyles } from '@mui/styles'
import { readCookie } from '../utils/cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
interface PrivateRouterProps {
  children: ReactNode
}
export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!readCookie('tokenDHJO')) {
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
