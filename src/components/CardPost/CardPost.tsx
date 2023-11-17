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
import { IPost } from '../../pages/Helpers/Helper'
import { ReactNode } from 'react'

const MySpan = styled('span')({
  fontWeight: 'bolder'
})
interface Props {
  post: IPost
  active?: boolean
  onClick?: () => void
  CardAction?: ReactNode
  CardNote?: ReactNode
}

export default function CardPost({ post, active, onClick, CardAction, CardNote }: Props) {
  //console.log('post', post)
  return (
    <Card sx={{ border: `${active ? '1px solid red' : '0px solid red'}`, position: 'relative' }} onClick={onClick}>
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
              src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
            />
          </Grid>

          <Grid item xs={7} sm={7} md={7}>
            <Typography>
              <MySpan>{post.title}</MySpan>
            </Typography>
            <Stack direction='row' spacing={1}>
              <Typography sx={{ fontSize: '12px' }}>
                <AttachMoneyIcon fontSize='inherit' />
                {`${post.fee} vnd/h`}
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                <CalendarMonthIcon fontSize='inherit' />
                {`${post.startTime.hour % 12}:${post.startTime.minute}${post.startTime.hour > 12 ? 'PM' : 'AM'}${
                  post.startDate.day
                }/${post.startDate.month}/${post.startDate.year}`}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: '12px' }}>
              <HomeIcon fontSize='inherit' />
              {`${post.house.street} ${post.house.ward},${post.house.district},${post.house.province}`}
            </Typography>

            <Stack direction='row' spacing={1}>
              <Typography sx={{ fontSize: '12px' }}>
                <WcIcon fontSize='inherit' />
                {`${post.preferredGender}`}
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                <SchoolIcon fontSize='inherit' />
                {`${post.preferredEducation}`}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              {post.skills.map((item) => (
                <Chip key={item} label={item} sx={{ fontSize: '12px' }} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      {CardNote}
    </Card>
  )
}
