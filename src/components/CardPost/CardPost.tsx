import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { Box, Grid } from '@mui/material'
import Stack from '@mui/material/Stack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HomeIcon from '@mui/icons-material/Home'
import WcIcon from '@mui/icons-material/Wc'
import SchoolIcon from '@mui/icons-material/School'
import Chip from '@mui/material/Chip'
import { ReactNode } from 'react'
import { renderDate } from '../../pages/ScheduleToday/ScheduleToday'
const MySpan = styled('span')({
  fontWeight: 'bolder',
  fontSize: '20px'
})
interface Props {
  post: any
  active?: boolean
  onClick?: () => void
  CardAction?: ReactNode
  CardNote?: ReactNode
}

export default function CardPost({ post, active, onClick, CardAction, CardNote }: Props) {
  return (
    <Card sx={{ border: `${active ? '1px solid #33c172' : '0px solid red'}`, boxShadow:`${active ? '0 10px 30px rgba(14,166,59,.2)' : 'unset'}`, position: 'relative', paddingRight: '10px', paddingBottom: '10px' }} onClick={onClick}>
      <Box sx={{ position: 'absolute', top: '5px', right: '5px' }}>{CardAction}</Box>{' '}
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
              src={post.house.base64Image ? `data:image;base64,${post.house.base64Image}` :`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2`}
            />
          </Grid>

          <Grid item xs={7} sm={7} md={7}>
            <Typography>
              <MySpan>{post.title}</MySpan>
            </Typography>
            <Stack direction='row' spacing={1}>
              <Typography sx={{ fontSize: '14px' }}>
                <AttachMoneyIcon fontSize='inherit' />
                {`${post.fee} vnd/h`}
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                <CalendarMonthIcon fontSize='inherit' />
                {renderDate(post.startDate, post.startTime)}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: '14px' }}>
              <HomeIcon fontSize='inherit' />
              {`${post.house.street} ${post.house.ward},${post.house.district},${post.house.province}`}
            </Typography>

            <Stack direction='row' spacing={1}>
              <Typography sx={{ fontSize: '14px' }}>
                <WcIcon fontSize='inherit' />
                {post.preferredGender ? `${post.preferredGender}`:'Không yêu cầu'}
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>
                <SchoolIcon fontSize='inherit' />
                {post.preferredEducation ? `${post.preferredEducation}`: 'Không yêu cầu'}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              {post.skills.map((item:any) => (
                <Chip key={item} label={item.toLocaleLowerCase()} sx={{ fontSize: '14px', border:'solid 2px #1977d2', textTransform: 'none' }} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      {CardNote}
    </Card>
  )
}
