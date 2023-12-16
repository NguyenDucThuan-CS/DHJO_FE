import { ReactNode, useEffect } from 'react'
import Header from '../components/Header/Header'
import { readCookie } from '../utils/cookie'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ModalDetailHelper from '../components/Modal/ModalDetailHelper'
import ModalRatingHelper from '../components/Modal/ModalRatingHelper'

import { getCountUnread } from '../apis/notification.api'
import { useDispatch } from 'react-redux'
import { doUpdateNumNoti } from '../redux/slice/notification'
interface PrivateRouterProps {
  children: ReactNode
}
export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { open } = useSelector((state: any) => state.modalHelperReducer)
  const { openRating } = useSelector((state: any) => state.modalHelperReducer)

  const checkCorrectRole = () => {
    if (window.location.href.split('/').includes('helper') && readCookie('roles') === 'ROLE_HELPER') return true
    if (window.location.href.split('/').includes('owner') && readCookie('roles') === 'ROLE_OWNER') return true
    return false
  }

  useEffect(() => {
    if (!readCookie('tokenDHJO') || !checkCorrectRole()) {
      return navigate('/login')
    }

    getCountUnread().then((res) => {
      dispatch(doUpdateNumNoti(res.data.data))
    })
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <Header />
      <div
        style={{
          padding: '20px',
          background: '#0000',
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          // maxWidth: '1488px',
          // margin: 'auto'
        }}
      >
        {children}
      </div>

      <ModalDetailHelper open={open} />
      <ModalRatingHelper open={openRating} />
      {/* <Footer /> */}
    </div>
  )
}
