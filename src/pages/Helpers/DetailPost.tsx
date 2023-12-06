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
// interface Props {
//   post?: IPost
//   onClick?: () => void
//   isHideBtn?: boolean
//   listHelper?: {
//     helperId: string
//     name: string
//     gender: {
//       id: string
//       name: string
//     }
//     birhday: string
//     education: {
//       id: string
//       name: string
//     }
//     skills: {
//       id: string
//       skillName: string
//     }[]
//   }[]
//   choose?: (id: string, flag: boolean) => void
// }
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
const DetailPost = ({
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
    const { year, month, day, hour, minute } = post.modifiedAt
    const renderTimeAgo = () => {
      const timeModified = new Date(year, month - 1, day, hour, minute)
      return timeSince(timeModified) + ' ago'
    }

    const checkHideBtn = () => {
      if (post.conflictedPostId || post.finished || post.applied || post.confirmed || post.rejected) {
        return true
      }
      return false
    }

    return (
      <Box sx={{ background: 'white', padding: '15px', position: 'sticky', top: 0 }}>
        <Typography variant='h4' align='left'>
          {post?.title}
        </Typography>
        <Box
          sx={{
            color: 'rgba(0, 0, 0, 0.54)',
            fontStyle: 'italic',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <p>
            {renderTimeAgo()}
            {post.applicantNumber !== null && post.applicantNumber !== undefined && (
              <span>{` - ${post.applicantNumber} người ứng tuyển`}</span>
            )}
          </p>
          <span style={{color: 'red'}}>{post.conflictedPostId && 'Tin đăng trùng thời gian với 1 tin đăng đã ứng tuyển'}</span>
        </Box>

        {!isHideBtn && !checkHideBtn() && (
          <Button sx={{ width: '100%', marginTop: '20px' }} variant='contained' onClick={onClick}>
            Nhận việc ngay
          </Button>
        )}

        {isConfirmBtn && (
          <Button sx={{ width: '100%', marginTop: '20px' }} variant='contained' onClick={onClickMarkPost}>
            Xác nhận hoàn thành
          </Button>
        )}
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* <Box sx = {{paddingLeft:'65px'}}>{renderTimeAgo()}</Box> */}
            <Stack direction='row' spacing={1} sx={{ marginBottom: '20px', paddingLeft: '26px' }}>
              {post?.skills.map((item: any) => <Chip key={item} label={item} sx={{ fontSize: '12px' }} />)}
            </Stack>

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
                <span>{`${renderHour(post.startTime)} ${post.startDate.day}-${post.startDate.month}-${
                  post.startDate.year
                }`}</span>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledHomeIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                <span>{`${post.house.houseNo} ${post.house.street} ${post.house.ward}, ${post.house.district}, ${post.house.province}`}</span>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledWcIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                {post.preferredGender ? `${post.preferredGender}` : 'Không yêu cầu'}
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledSchoolIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                {post.preferredEducation ? post.preferredEducation : 'Không yêu cầu'}
              </Grid>
            </Grid>
            {post.recurringPattern && (
              <>
                <Grid container alignItems='center'>
                  <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledRestoreIcon className={classes.icon} />
                  </StyledGrid>
                  <Grid item xs={10}>
                    {post.recurringPattern.period}
                  </Grid>
                </Grid>

                <Grid container alignItems='center'>
                  <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledEventAvailableIcon className={classes.icon} />
                  </StyledGrid>
                  <Grid item xs={10}>
                    {`${post.recurringPattern.endDate[2]}-${post.recurringPattern.endDate[1]}-${post.recurringPattern.endDate[0]}`}
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
          <Grid item xs={6}>
            <MapContainer
              center={[post.house.coordinate.latitude, post.house.coordinate.longitude]}
              zoom={10000}
              scrollWheelZoom={false}
              style={{ width: '100%', height: '100%' }}
              key={post.id}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={[post.house.coordinate.latitude, post.house.coordinate.longitude]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />

        {!isHideFooter && (
          <Box>
            <Typography variant='h6' sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Người giúp việc {post?.applied ? 'đăng kí' : 'nhận việc'}
            </Typography>
            <Grid container spacing={2}>
              {listHelper?.map((item: any) => (
                <Grid item xs={6}>
                  <HelperCard
                    key={item.helperId}
                    helperId={item.helperId}
                    name={item.name}
                    gender={item.gender}
                    birthday={item.birthday}
                    education={item.education}
                    skills={item.skills}
                    choose={choose}
                    phone={item.phoneNum}
                    overallRating={item.overallRating}
                    hideBtn={!post?.applied}
                    rating={post.finished}
                    clickRating={clickRating}
                    isFavourite={item.isFavourite}
                    img={item.base64Image}
                    //isChosen={idChosen == item.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    )
  }
}

export default DetailPost
