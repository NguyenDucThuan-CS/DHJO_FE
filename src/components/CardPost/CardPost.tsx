import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { Box, Grid } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HomeIcon from '@mui/icons-material/Home'
import WcIcon from '@mui/icons-material/Wc'
import SchoolIcon from '@mui/icons-material/School'
import { ReactNode } from 'react'
import { timeSince, renderHour } from '../../utils/common'
import { numberWithCommas } from '../../utils/common'
const MySpan = styled('span')({
  //fontWeight: 'bolder',
  fontSize: '20px',
  paddingLeft:'18px'
})
interface Props {
  post: any
  active?: boolean
  onClick?: () => void
  CardAction?: ReactNode
  CardNote?: ReactNode
}
const PREFIX = 'Demo'
const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`
}
const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: 'center'
  }
}))
export const StyledAttachMoneyIcon = styled(AttachMoneyIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledCalendarIcon = styled(CalendarMonthIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledHomeIcon = styled(HomeIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledWcIcon = styled(WcIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledSchoolIcon = styled(SchoolIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))
export default function CardPost({ post, active, onClick, CardAction, CardNote }: Props) {
  return (
    <Card
      sx={{
        border: `${active ? '1px solid #33c172' : '0px solid red'}`,
        boxShadow: `${active ? '0 10px 30px rgba(14,166,59,.2)' : 'unset'}`,
        position: 'relative',
      }}
      onClick={onClick}
    >
      <Box sx={{ position: 'absolute', top: '5px', right: '5px' }}>{CardAction}</Box>{' '}
      <CardContent sx = {{padding:0, height: '200px'}}>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={5} md={5}>
            <Box
              component='img'
              sx={{
                width: '100%',
                height: '100%'
              }}
              alt='The house from the offer.'
              src={
                post.house.base64Image
                  ? `data:image;base64,${post.house.base64Image}`
                  : `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2`
              }
            />
          </Grid>

          <Grid item xs={7} sm={7} md={7}>
            <Typography sx = {{marginTop:'15px'}}>
              <MySpan>{post.title}</MySpan>
            </Typography>

            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledAttachMoneyIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                <span>{`${numberWithCommas(post?.fee)} vnd`}</span>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledCalendarIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                <span>{`${renderHour(post.startTime)} ${post.startDate.day}-${post.startDate.month}-${post.startDate.year}`}</span>
              </Grid>
            </Grid>

            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledHomeIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                <span>{`${post.house.street} ${post.house.ward},${post.house.district},${post.house.province}`}</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      {CardNote}
    </Card>
  )
}
