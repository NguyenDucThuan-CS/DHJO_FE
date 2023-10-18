import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Grid, Divider } from '@mui/material'
import Stack from '@mui/material/Stack/Stack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HomeIcon from '@mui/icons-material/Home'
import { IPost } from './Helper'
import Chip from '@mui/material/Chip'

interface Props {
  post?: IPost
  onClick?: () => void
  isHideBtn?: boolean
}

const DetailPost = ({ post, onClick, isHideBtn }: Props) => {
  if (post)
    return (
      <Box>
        <Typography variant='h4' align='center'>
          Dọn dẹp nhà cửa
        </Typography>
        {!isHideBtn && (
          <Button sx={{ width: '100%', marginTop: '20px' }} variant='contained' onClick={onClick}>
            Nhận việc ngay
          </Button>
        )}
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack direction='row' spacing={1} sx={{ marginBottom: '20px' }}>
              {post.skills.map((item) => (
                <Chip key={item} label={item} sx={{ fontSize: '12px' }} />
              ))}
            </Stack>

            <Typography sx={{ marginBottom: '20px' }}>
              <AttachMoneyIcon fontSize='inherit' />
              {`${post.fee} vnd/h`}
            </Typography>
            <Typography sx={{ marginBottom: '20px' }}>
              <CalendarMonthIcon fontSize='inherit' />
              {`${post.startTime.hour % 10}:${post.startTime.minute}${post.startTime.hour > 12 ? 'PM' : 'AM'}:${
                post.startDate.day
              }/${post.startDate.month}/${post.startDate.year}`}
            </Typography>

            <Typography>
              <HomeIcon fontSize='inherit' />
              {`${post.house.street} ${post.house.ward},${post.house.district},${post.house.province}`}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, omnis aperiam? Vel unde nobis laboriosam
            nostrum, harum libero ipsam aliquid!
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
        <Box>
          <Typography variant='h6' sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Mô tả công việc
          </Typography>
          <Box> {post.content}</Box>
        </Box>
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
        {/* <Box>
        <Typography variant='h6' sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Công việc đã hoàn thành
        </Typography>
      </Box> */}
      </Box>
    )
}

export default DetailPost
