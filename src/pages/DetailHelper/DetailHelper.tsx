import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { ListStar } from '../../components/ListStar/ListStar'
import { useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person'
import ManIcon from '@mui/icons-material/Man'
import CakeIcon from '@mui/icons-material/Cake'
import SchoolIcon from '@mui/icons-material/School'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { timeSince } from '../../utils/common'
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

export const StyledPersonIcon = styled(PersonIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledManIcon = styled(ManIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledCakeIcon = styled(CakeIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledSchoolIcon = styled(SchoolIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))
const DetailHelper = () => {
  const { helperInfo } = useSelector((state: any) => state.modalHelperReducer)
  const renderTimeAgo = (arr: any) => {
    const timeModified = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4])
    return timeSince(timeModified) + ' ago'
  }

  return (
    <Container maxWidth='md' sx={{ paddingLeft: 0 }}>
      <p style={{ marginBottom: '20px', fontSize: '26px', fontWeight: 'bold' }}>
        Phản hồi từ chủ nhà
        <Stack display={'flex'} direction={'row'}>
          {helperInfo.overallRating.avgScore == -1 ? 0 :helperInfo.overallRating.avgScore} <ListStar number={helperInfo.overallRating.avgScore + 1} />
        </Stack>
      </p>
      <Grid container spacing={2}>
        <Stack sx = {{width: '100%'}}>
          {helperInfo.overallRating.typicalRatings.length === 0 && 'Chưa có đánh giá'}
          {helperInfo.overallRating.typicalRatings?.map((item: any, index: any) => (
            <Box
              sx={{
                background: '#d6e5eb',
                marginTop: '10px',
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <p style={{ color: 'black', fontWeight: 'bold' }}>{item.name}</p>
              <p style={{ color: 'black', fontSize: '22px' }}>{item.postTitle}</p>

              <Stack direction={'row'} spacing={2}>
                <ListStar number={item.score + 1} />{' '}
                <span style={{ color: 'rgba(0, 0, 0, 0.54)', fontStyle: 'italic' }}>
                  {renderTimeAgo(item.modifiedAt)}
                </span>
              </Stack>

              <p>{item.comment}</p>
            </Box>
          ))}
        </Stack>
      </Grid>
    </Container>
  )
}

export default DetailHelper
