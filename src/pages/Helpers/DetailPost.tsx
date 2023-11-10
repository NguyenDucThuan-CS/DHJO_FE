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
import HelperCard from '../FavoriteHelpers/HelperCard/HelperCard'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { useEffect, useRef } from 'react'
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
const DetailPost = ({ post, onClick, isHideBtn, listHelper, choose, isHideFooter }: any) => {
  
  if (post) return (
    <Box>
      <Typography variant='h4' align='center'>
        {post?.title}
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
            {post?.skills.map((item: any) => <Chip key={item} label={item} sx={{ fontSize: '12px' }} />)}
          </Stack>

          <Typography sx={{ marginBottom: '20px' }}>
            <AttachMoneyIcon fontSize='inherit' />
            {`${post?.fee} vnd/h`}
          </Typography>
          <Typography sx={{ marginBottom: '20px' }}>
            <CalendarMonthIcon fontSize='inherit' />
            {`${post?.startTime.hour % 10}:${post?.startTime.minute}${post?.startTime.hour > 12 ? 'PM' : 'AM'}:${post
              ?.startDate.day}/${post?.startDate.month}/${post?.startDate.year}`}
          </Typography>

          <Typography>
            <HomeIcon fontSize='inherit' />
            {`${post?.house.street} ${post?.house.ward},${post?.house.district},${post?.house.province}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <MapContainer
            center={[post.house.coordinate.latitude, post.house.coordinate.longitude]}
            zoom={10000}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '100%' }}
            key = {post.id}
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
      <Box>
        <Typography variant='h6' sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Mô tả công việc
        </Typography>
        <Box> {post?.content}</Box>
      </Box>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
      {!isHideFooter && (
        <Box>
          <Typography variant='h6' sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Người giúp việc {post?.applied ? 'đăng kí' : 'nhận việc'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {listHelper?.map((item: any) => (
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
                  //isChosen={idChosen == item.id}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default DetailPost
