import { Menu, PopoverOrigin, PopoverVirtualElement, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

interface MenuListProps {
  children: ReactNode
  anchorEl: Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined
  onClose: () => void
  sx: SxProps<Theme> | undefined
  anchorOrigin: PopoverOrigin | undefined
  transformOrigin: PopoverOrigin | undefined
}

export const MenuList = ({ children, anchorEl, onClose, anchorOrigin, transformOrigin, sx }: MenuListProps) => {
  return (
    <Menu
      id='menu-appbar'
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      keepMounted
      transformOrigin={transformOrigin}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={sx}
    >
      {children}
    </Menu>
  )
}
