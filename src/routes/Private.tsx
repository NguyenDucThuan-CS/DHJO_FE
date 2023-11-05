import { ReactNode, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { readCookie } from '../utils/cookie'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ModalDetailHelper from '../components/Modal/ModalDetailHelper'
import { Button } from '@mui/material'

interface PrivateRouterProps {
  children: ReactNode
}
export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const navigate = useNavigate()

  const { open } = useSelector((state: any) => state.modalHelperReducer)

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
    <div style={{ position: 'relative' }}>
      <Header />
      <div style={{ padding: '20px' }}>{children}</div>

      <ModalDetailHelper open={open} />
     
      {/* <Footer /> */}
    </div>
  )
}
