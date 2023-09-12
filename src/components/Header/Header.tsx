import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Badge } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { MenuList } from '../MenuList/MenuList'

const pages = [
  { name: 'Trang chủ', to: '/' },
  { name: 'Hồ sơ của bạn', to: '/my-profiles' },
  { name: 'Tin đăng của bạn', to: '/my-news' },
  { name: 'Người giúp việc yêu thích', to: '/favorite-helpers' }
]
const settings = ['Hồ sơ', 'Đăng xuất']

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const location = useLocation()
  const navigate = useNavigate()

  console.log('location', location)

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Logo variant={'h6'} display={{ xs: 'none', md: 'flex' }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <MenuList anchorElNav={anchorElNav} handleCloseNavMenu={handleCloseNavMenu}>
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu()
                    navigate(page.to)
                  }}
                >
                  <Typography
                    textAlign='center'
                    sx={{ borderBottom: location.pathname === page.to ? '2px solid orange' : 'none' }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Logo variant={'h5'} display={{ xs: 'flex', md: 'none' }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  handleCloseNavMenu()
                  navigate(page.to)
                }}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  borderBottom: location.pathname === page.to ? '2px solid orange' : 'none',
                  borderRadius: 0,
                  paddingBottom: 0
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Badge badgeContent={17} color='error' sx={{ mr: 3 }}>
            <NotificationsIcon />
          </Badge>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Temy Sharp' src='/static/images/avatar/2.jpg' />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
