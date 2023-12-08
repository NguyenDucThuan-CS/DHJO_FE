import * as React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Badge } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { MenuList } from '../MenuList/MenuList'
import { Wrapper } from './Wrapper'
import IconHamburger from './IconButton'
import { deteletAllCookie } from '../../utils/cookie'
import Notification from '../Notification/Notification'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import logoImg from '../../assets/img/logo.png'
import { doOpenNoti, doCloseNoti } from '../../redux/slice/notification'
import { Modal } from '../Modal/Modal'
import DetailPost from '../../pages/Helpers/DetailPost'
import { applyPost, chooseHelper } from '../../apis/post.api'
import { toast } from 'react-toastify'

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)


  const { numNoti } = useSelector((state: any) => state.notiReducer)
  const { open: openNoti } = useSelector((state: any) => state.notiReducer)

  const [openModalPost, setOpenModalPost] = React.useState<any>(false)
  const [openModalPostHelper, setOpenModalPostHelper] = React.useState<any>(false)
  const [post, setPost] = React.useState<any>()
  const [postForHelper, setPostForHelper] = React.useState<any>()
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
  const dispatch = useDispatch()

  const logout = () => {
    deteletAllCookie()
    navigate('/login')
  }

  const ownerSetting = [
    {
      title: 'Hồ sơ',
      action: () => {
        handleCloseUserMenu()
        navigate('/owner/profiles')
      }
    },
    {
      title: 'Đăng xuất',
      action: () => {
        handleCloseUserMenu()
        logout()
      }
    }
  ]
  const helperSetting = [
    {
      title: 'Hồ sơ',
      action: () => {
        handleCloseUserMenu()
        navigate('/helper/profiles')
      }
    },
    {
      title: 'Đăng xuất',
      action: () => {
        handleCloseUserMenu()
        logout()
      }
    }
  ]

  const pagesForOwner = [
    { name: 'Trang chủ', to: '/owner' },
    { name: 'Hồ sơ của bạn', to: '/owner/profiles' },
    { name: 'Tin đăng của bạn', to: '/owner/my-news' },
    { name: 'Người giúp việc yêu thích', to: '/owner/favorite-helpers' }
  ]

  const pagesForHelper = [
    { name: 'Trang chủ', to: '/helper' },
    { name: 'Hồ sơ của bạn', to: '/helper/profiles' },
    { name: 'Hoạt động', to: '/helper/activitive' },
    { name: 'Lịch làm việc', to: '/helper/schedules' }
  ]

  const renderContentHeader = () => {
    if (window.location.href.split('/').includes('owner')) {
      return pagesForOwner
    }
    return pagesForHelper
  }

  const renderSetting = () => {
    if (window.location.href.split('/').includes('helper')) {
      return helperSetting
    }
    return ownerSetting
  }
  const clickLogo = () => {
    if (window.location.href.split('/').includes('owner')) {
      navigate('/owner')
    } else {
      navigate('/helper')
    }
  }
  const choose = (id: string) => {
    chooseHelper(post.id, id)
      .then((res) => {
        toast.success('Chọn người giúp việc thành công')
      })
      .finally(() => {
        setOpenModalPost(false)
      })
  }

  const helperApplyPost = () => {
    applyPost(postForHelper.id)
      .then(() => {
       toast.success('Đăng kí giúp việc thành công')
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
      .finally(() => {
        setOpenModalPostHelper(false)
      })
  }
  return (
    <Wrapper>
      <img src={logoImg} style={{ width: '120px', height: '50px', marginRight: '10px' }} onClick={clickLogo} />
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconHamburger onClick={handleOpenNavMenu} />
        <MenuList
          anchorEl={anchorElNav}
          onClose={handleCloseNavMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {renderContentHeader().map((page) => (
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
        {renderContentHeader().map((page) => (
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
      <Box sx={{ position: 'relative' }}>
        <Box
          onClick={() => {
            if (!openNoti) dispatch(doOpenNoti({}))
            else dispatch(doCloseNoti({}))
          }}
        >
          <Badge badgeContent={numNoti} color='error' sx={{ mr: 3 }}>
            <NotificationsIcon />
          </Badge>
        </Box>

        {openNoti && (
          <Notification
            setPost={setPost}
            setOpenModalPost={setOpenModalPost}
            setPostForHelper={setPostForHelper}
            setOpenModalPostHelper={setOpenModalPostHelper}
          />
        )}
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Temy Sharp' src='' />
        </IconButton>
        <MenuList
          sx={{ mt: '45px' }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={handleCloseUserMenu}
        >
          {renderSetting().map((setting) => (
            <MenuItem key={setting.title} onClick={setting.action}>
              <Typography textAlign='center'>{setting.title}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Box>

      <Modal
        open={openModalPost}
        handleClose={() => setOpenModalPost(false)}
        Content={
          <DetailPost
            choose={choose}
            isHideBtn={true}
            listHelper={post?.helpers}
            post={post}
            isHideFooter={false}
          ></DetailPost>
        }
      />

      <Modal
        open={openModalPostHelper}
        handleClose={() => setOpenModalPostHelper(false)}
        Content={<DetailPost isHideFooter={true} post={postForHelper} onClick = {helperApplyPost}></DetailPost>}
      />
    </Wrapper>
  )
}
export default Header
