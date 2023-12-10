import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { styled } from '@mui/system'
import { Box, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { doOpenModal, doUpdateHelperInfo } from '../../../redux/slice/modalDetai'
import PersonIcon from '@mui/icons-material/Person'
import ManIcon from '@mui/icons-material/Man'
import CakeIcon from '@mui/icons-material/Cake'
import Stack from '@mui/material/Stack'
import SchoolIcon from '@mui/icons-material/School'
import Chip from '@mui/material/Chip'
import { ListStar } from '../../../components/ListStar/ListStar'
import { AddFavorite } from '../../../assets/svg/AddFavorite'
import { RemoveFavorite } from '../../../assets/RemoveFavorite'
import { addFavoriteHelper, removeFavoriteHelper } from '../../../apis/favaritehelper.api'
import { toast } from 'react-toastify'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useState } from 'react'
import { ZaloIcon } from '../../../assets/svg/Zalo'
const MySpan = styled('span')({
  marginLeft: '8px'
})
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

export const StyledLocalPhoneIcon = styled(LocalPhoneIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))
export const StyledStack = styled(Stack)(({ theme: { palette } }) => ({
  '&::-webkit-scrollbar' :{
    display: 'none',
    overflow: 'scroll'
  }
}))

export default function HelperCard({
  name,
  gender,
  birthday,
  education,
  skills,
  remove,
  helperId,
  choose,
  isChosen,
  phone,
  overallRating,
  hideBtn,
  rating,
  clickRating,
  isFavourite: isFavouriteIn,
  img,
  isHideBtnChatZalo,
}: any) {
  const dispatch = useDispatch()
  const [isFavourite, setIsFavourite] = useState<any>(isFavouriteIn)

  return (
    <Box
      sx={{ position: 'relative' }}
      onClick={() => {
        dispatch(doOpenModal({}))
        dispatch(
          doUpdateHelperInfo({
            doB: `${birthday.day}/${birthday.month}/${birthday.year}`,
            gender: gender.name,
            edu: education.name,
            skill: skills,
            phone: phone,
            name: name,
            overallRating: overallRating,
            img: img
          })
        )
      }}
    >
      {!isFavourite ? (
        <span
          style={{ position: 'absolute', top: '10px', right: '5px' }}
          onClick={(e) => {
            e.stopPropagation()
            setIsFavourite(!isFavourite);
            addFavoriteHelper(helperId)
              .then((res) => {
                toast.success('Thêm vào danh sách yêu thích thành công')
              })
              .catch((error) => toast.error(error.response.data.message))
          }}
        >
          <AddFavorite />
        </span>
      ) : (
        <span
          style={{ position: 'absolute', top: '10px', right: '5px' }}
          onClick={(e) => {
            e.stopPropagation()
            setIsFavourite(!isFavourite);
            removeFavoriteHelper(helperId)
              .then((res) => {
                toast.success('Loại khỏi vào danh sách yêu thích thành công')
              })
              .catch((error) => toast.error(error.response.data.message))
          }}
        >
          <RemoveFavorite />
        </span>
      )}
      <Card>
        <CardContent sx = {{height: '230px'}}>
          <Grid container spacing={2}>
            <Grid item xs={5} sm={5} md={5}>
              <Box
                component='img'
                sx={{
                  width: '100%',
                  height: '100%'
                }}
                alt='Image'
                src={`data:image;base64,${img}`}
              />
            </Grid>

            <Grid item xs={7} sm={7} md={7}>
              <Grid container alignItems='center'>
                <StyledGrid item xs={2} className={classes.textCenter}>
                  <StyledPersonIcon className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                  <span style={{ fontSize: '14px' }}>{name}</span>
                </Grid>
              </Grid>

              <Grid container alignItems='center'>
                <StyledGrid item xs={2} className={classes.textCenter}>
                  <StyledManIcon className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                  <span style={{ fontSize: '14px' }}>{gender.name}</span>
                </Grid>
              </Grid>
              <Grid container alignItems='center'>
                <StyledGrid item xs={2} className={classes.textCenter}>
                  <StyledCakeIcon className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                  <span style={{ fontSize: '14px' }}>{`${birthday.day}/${birthday.month}/${birthday.year}`}</span>
                </Grid>
              </Grid>
              <Grid container alignItems='center'>
                <StyledGrid item xs={2} className={classes.textCenter}>
                  <StyledSchoolIcon className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                  <span style={{ fontSize: '14px' }}>{education.name}</span>
                </Grid>
              </Grid>
              <Grid container alignItems='center'>
                <StyledGrid item xs={2} className={classes.textCenter}>
                  <StyledLocalPhoneIcon className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                  <span style={{ fontSize: '14px' }}>{phone}</span>
                </Grid>
              </Grid>
              <Grid container alignItems='center' onClick={() => {
                 window.open(`https://zalo.me/${phone}`, "_blank");
              }}> 
                <StyledGrid item xs={2} className={classes.textCenter}>
                  <ZaloIcon />
                </StyledGrid>
                <Grid item xs={10}>
                  <span style={{ fontSize: '14px' }}>{'Chat zalo'}</span>
                </Grid>
              </Grid>
              
              <Stack direction={'row'} alignItems={'center'} sx={{ marginTop: '5px' }}>
                <StyledStack direction='row' spacing={1} style = {{overflow: 'scroll'}}>
                  {skills.map((item: any) => (
                    <Chip key={item.skillName} label={item.skillName} sx={{ fontSize: '12px' }} />
                  ))}
                   {skills.map((item: any) => (
                    <Chip key={item.skillName} label={item.skillName} sx={{ fontSize: '12px' }} />
                  ))}
                </StyledStack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {remove && (
            <Button
              size='small'
              variant='contained'
              color='error'
              onClick={(e) => {
                e.stopPropagation()
                remove(helperId)
              }}
            >
              Xóa
            </Button>
          )}
          {choose && !isChosen && !hideBtn && (
            <Button
              size='small'
              variant='contained'
              color='warning'
              onClick={(e) => {
                e.stopPropagation()
                choose(helperId, true)
              }}
            >
              Chọn
            </Button>
          )}

          {choose && isChosen && (
            <Button
              size='small'
              variant='contained'
              color='inherit'
              onClick={(e) => {
                e.stopPropagation()
                choose(helperId, false)
              }}
            >
              Bỏ chọn
            </Button>
          )}

          {rating && (
            <Button
              size='small'
              variant='contained'
              color='inherit'
              onClick={(e) => {
                e.stopPropagation()
                clickRating()
              }}
            >
              Đánh giá
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}
