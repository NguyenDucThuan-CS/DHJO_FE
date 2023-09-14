import { ReactNode } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { makeStyles } from '@mui/styles'
interface PrivateRouterProps {
  children: ReactNode
}
export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const useStyles = makeStyles(() => ({
    content: {
      minHeight: 'cacl(100vh - 687px)'
    }
  }))
  const classes = useStyles()
  return (
    <>
      <Header />
      <div className={classes.content}>{children}</div>
      <Footer />
    </>
  )
}
