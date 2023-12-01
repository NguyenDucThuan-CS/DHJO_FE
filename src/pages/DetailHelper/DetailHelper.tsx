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

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Stack>
          {helperInfo.overallRating.typicalRatings.length === 0 && 'Chưa có đánh giá nha'}
          {helperInfo.overallRating.typicalRatings?.map((item: any, index: any) => (
            <Box
              sx={{
                background: '#F4FCFF',
                marginTop: '10px',
                width: '300px',
                padding: '10px',
                borderRadius: '15px'
              }}
            >
              <p style={{ color: 'black', fontWeight: 'bold' }}>Đánh giá {index + 1}</p>
              <Stack direction={'row'}>
                <span>{item.score}</span>
                <ListStar number={item.score + 1} />
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
