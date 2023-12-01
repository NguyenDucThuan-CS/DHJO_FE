import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Grid, Divider } from '@mui/material'
import Stack from '@mui/material/Stack/Stack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HomeIcon from '@mui/icons-material/Home'
import Chip from '@mui/material/Chip'
import HelperCard from '../FavoriteHelpers/HelperCard/HelperCard'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { styled } from '@mui/system'
import WcIcon from '@mui/icons-material/Wc'
import SchoolIcon from '@mui/icons-material/School'
import { renderHour, timeSince } from '../../utils/common'
import RestoreIcon from '@mui/icons-material/Restore'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import { numberWithCommas } from '../../utils/common'

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

export const StyledRestoreIcon = styled(RestoreIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledEventAvailableIcon = styled(EventAvailableIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))
const PreviewPost = ({
  post,
  onClick,
  isHideBtn,
  listHelper,
  choose,
  isHideFooter,
  clickRating,
  isConfirmBtn,
  onClickMarkPost
}: any) => {
  if (post) {
   
    return (
      <Box sx={{ background: 'white', padding: '15px', position: 'sticky', top: 0 }}>
        <Typography variant='h4' align='left'>
          {post?.title}
        </Typography>
        <Box
          sx={{
            color: 'rgba(0, 0, 0, 0.54)',
            fontStyle: 'italic'
          }}
        >
        
          {post.applicantNumber !== null && post.applicantNumber !== undefined && <span>{` - ${post.applicantNumber} người ứng tuyển`}</span>}
        </Box>

        
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <Box sx = {{paddingLeft:'65px'}}>{renderTimeAgo()}</Box> */}
            <Stack direction='row' spacing={1} sx={{ marginBottom: '20px', paddingLeft: '26px' }}>
              {post?.skills.map((item: any) => <Chip key={item.id} label={item.skillName} sx={{ fontSize: '12px' }} />)}
            </Stack>

            <Grid container alignItems='center'>
              <StyledGrid item xs={1} className={classes.textCenter}>
                <StyledAttachMoneyIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={11}>
                <span>{`${numberWithCommas(post?.fee)} vnd`}</span>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={1} className={classes.textCenter}>
                <StyledCalendarIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={11}>
                <span>{`${renderHour(post.startTime)} ${post.startDate}`}</span>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={1} className={classes.textCenter}>
                <StyledHomeIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={11}>
                <span>{`${post.house.street} ${post.house.ward.type} ${post.house.ward.name},${post.house.district.type} ${post.house.district.name},${post.house.province.type} ${post.house.province.name}`}</span>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={1} className={classes.textCenter}>
                <StyledWcIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={11}>
                {post.preferredGender.id !== '0' ? `${post.preferredGender.name}` : 'Không yêu cầu'}
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={1} className={classes.textCenter}>
                <StyledSchoolIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={11}>
                {post.preferredEducation.id !== '0' ? post.preferredEducation.name : 'Không yêu cầu'}
              </Grid>
            </Grid>
            {post.recurringPattern && (
              <>
                <Grid container alignItems='center'>
                  <StyledGrid item xs={1} className={classes.textCenter}>
                    <StyledRestoreIcon className={classes.icon} />
                  </StyledGrid>
                  <Grid item xs={11}>
                    {post.recurringPattern.period.name}
                  </Grid>
                </Grid>

                <Grid container alignItems='center'>
                  <StyledGrid item xs={1} className={classes.textCenter}>
                    <StyledEventAvailableIcon className={classes.icon} />
                  </StyledGrid>
                  <Grid item xs={11}>
                     {post.recurringPattern.endDate}
                  </Grid>
                </Grid>
              </>
            )}

            <Box>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
              <Typography variant='h6' sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                Mô tả công việc
              </Typography>
              <Box> {post?.content}</Box>
            </Box>
          </Grid>
         
        </Grid>
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />

       
      </Box>
    )
  }
}

export default PreviewPost
