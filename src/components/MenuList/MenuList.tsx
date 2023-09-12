import { Menu, PopoverVirtualElement } from '@mui/material'
import { ReactNode } from 'react'

interface MenuListProps {
  children: ReactNode
  anchorElNav: Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined
  handleCloseNavMenu: () => void
}

export const MenuList = ({ children, anchorElNav, handleCloseNavMenu }: MenuListProps) => {
  return (
    <Menu
      id='menu-appbar'
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' }
      }}
    >
      {children}
    </Menu>
  )
}
