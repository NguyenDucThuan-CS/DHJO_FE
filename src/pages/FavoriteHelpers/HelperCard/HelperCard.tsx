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

const MySpan = styled('span')({
  marginLeft: '8px'
})

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
  isFavourite,
  img
}: any) {
  const dispatch = useDispatch()
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
        <CardContent>
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
              <Stack direction={'row'} alignItems={'center'}>
                <PersonIcon />
                <MySpan>{name}</MySpan>
              </Stack>
              <Stack direction={'row'} alignItems={'center'}>
                <ManIcon />
                <MySpan>{gender.name}</MySpan>
              </Stack>
              <Stack direction={'row'} alignItems={'center'}>
                <CakeIcon />
                <MySpan> {`${birthday.day}/${birthday.month}/${birthday.year}`}</MySpan>
              </Stack>

              <Stack direction={'row'} alignItems={'center'}>
                <SchoolIcon />
                <MySpan> {education.name}</MySpan>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} sx = {{marginTop:'5px'}}>
                <Stack direction='row' spacing={1}>
                  {skills.map((item: any) => (
                    <Chip key={item.skillName} label={item.skillName} sx={{ fontSize: '12px' }} />
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ paddingLeft: '12px' }}>
          <ListStar number={overallRating.avgScore + 1}></ListStar>
        </Box>
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
