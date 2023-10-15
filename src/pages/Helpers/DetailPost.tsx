import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Grid, Divider } from '@mui/material'
import Stack from '@mui/material/Stack/Stack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HomeIcon from '@mui/icons-material/Home'

import Chip from '@mui/material/Chip'

const DetailPost = () => {
  return (
    <Box>
      <Typography variant='h4' align='center'>
        Dọn dẹp nhà cửa
      </Typography>
      <Button sx={{ width: '100%', marginTop: '20px' }} variant='contained'>
        Nhận việc ngay
      </Button>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack direction='row' spacing={1} sx={{ marginBottom: '20px' }}>
            <Chip label='Chip Filled' />
            <Chip label='Chip Filled' />
          </Stack>

          <Typography sx={{ marginBottom: '20px' }}>
            <AttachMoneyIcon fontSize='inherit' />
            {`25000 vnd/h`}
          </Typography>
          <Typography sx={{ marginBottom: '20px' }}>
            <CalendarMonthIcon fontSize='inherit' />
            {'10:00'}
          </Typography>

          <Typography>
            <HomeIcon fontSize='inherit' />
            {'39 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, omnis aperiam? Vel unde nobis laboriosam nostrum, harum libero ipsam aliquid!
        </Grid>
      </Grid>
      <></>
    </Box>
  )
}

export default DetailPost
