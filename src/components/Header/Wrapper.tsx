import { AppBar, Container, Toolbar } from '@mui/material'
import { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
}
export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>{children}</Toolbar>
      </Container>
    </AppBar>
  )
}
