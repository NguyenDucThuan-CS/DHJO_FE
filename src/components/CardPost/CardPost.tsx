import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { Box, Grid } from '@mui/material'
import { Post } from '../../apis/post.api'
import Stack from '@mui/material/Stack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HomeIcon from '@mui/icons-material/Home'
import WcIcon from '@mui/icons-material/Wc'
import SchoolIcon from '@mui/icons-material/School'
import Chip from '@mui/material/Chip'

const MySpan = styled('span')({
  fontWeight: 'bolder'
})

export default function CardPost({ ...post }: Post) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={5} md={5}>
            <Box
              component='img'
              sx={{
                width: '100%',
                height: '100%'
              }}
              alt='The house from the offer.'
              src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
            />
          </Grid>

          <Grid item xs={7} sm={7} md={7}>
            <Typography>
              <MySpan>{'Dọn dẹp nhà cửa'}</MySpan>
            </Typography>
            <Stack direction='row' spacing={1}>
              <Typography sx={{ fontSize: '12px' }}>
                <AttachMoneyIcon fontSize='inherit' />
                {`25000 vnd/h`}
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                <CalendarMonthIcon fontSize='inherit' />
                {'10:00'}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: '12px' }}>
              <HomeIcon fontSize='inherit' />
              {'39 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh'}
            </Typography>

            <Stack direction='row' spacing={1}>
              <Typography sx={{ fontSize: '12px' }}>
                <WcIcon fontSize='inherit' />
                {`Nữ`}
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                <SchoolIcon fontSize='inherit' />
                {'Tốt nghiệp cấp 3'}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <Chip label='Chip Filled' sx={{ fontSize: '12px' }} />
              <Chip label='Chip Filled' sx={{ fontSize: '12px' }} />
              <Chip label='Chip Filled' sx={{ fontSize: '12px' }} />
              <Chip label='Chip Filled' sx={{ fontSize: '12px' }} />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      {/* <CardActions>
        {remove && (
          <Button size='small' variant='contained' color='error' onClick={() => remove(id)}>
            Xóa
          </Button>
        )}
        {choose && !isChosen && (
          <Button size='small' variant='contained' color='warning' onClick={() => choose(id, true)}>
            Chọn
          </Button>
        )}

        {choose && isChosen && (
          <Button size='small' variant='contained' color='inherit' onClick={() => choose(id, false)}>
            Bỏ chọn
          </Button>
        )}
      </CardActions> */}
    </Card>
  )
}
