import { Stack } from '@mui/material'

const NoNoti = () => {
  return (
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <img src='https://static.topcv.vn/v4/image/toppy-notification-empty.png' />
      <span style={{ color: '#a6acb2', fontSize: '12px' }}>Bạn chưa có thông báo nào</span>
    </Stack>
  )
}

export default NoNoti
