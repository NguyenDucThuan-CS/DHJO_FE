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

const DetailPost = ({ post, onClick, isHideBtn, listHelper, choose, isHideFooter, contentBtn }: any) => {
  if (post)
    return (
      <Box style = {{background: 'white', padding: '15px',position:'sticky', top: 0}}>
        <Typography variant='h4' align='center'>
          {post?.title}
        </Typography>
        {!isHideBtn && (
          <Button sx={{ width: '100%', marginTop: '20px' }} variant='contained' onClick={onClick}>
            {contentBtn}
          </Button>
        )}
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack direction='row' spacing={1} sx={{ marginBottom: '20px' }}>
              {post?.skills.map((item:any) => (
                <Chip key={item} label={item} sx={{ fontSize: '12px' }} />
              ))}
            </Stack>

            <Typography sx={{ marginBottom: '20px' }}>
              <AttachMoneyIcon fontSize='inherit' />
              {`${post?.fee} vnd/h`}
            </Typography>
            <Typography sx={{ marginBottom: '20px' }}>
              <CalendarMonthIcon fontSize='inherit' />
              {`${post?.startTime.hour % 10}:${post?.startTime.minute}${post?.startTime.hour > 12 ? 'PM' : 'AM'}:${
                post?.startDate.day
              }/${post?.startDate.month}/${post?.startDate.year}`}
            </Typography>

            <Typography>
              <HomeIcon fontSize='inherit' />
              {`${post?.house.street} ${post?.house.ward},${post?.house.district},${post?.house.province}`}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, omnis aperiam? Vel unde nobis laboriosam
            nostrum, harum libero ipsam aliquid!
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
        <Box>
          <Typography variant='h6' sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Mô tả công việc
          </Typography>
          <Box> {post?.content}</Box>
        </Box>
       
        {!isHideFooter && <Box>
          <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
          <Typography variant='h6' sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Người giúp việc {post?.applied?'đăng kí':'nhận việc'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {listHelper?.map((item:any) => (
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
                  hideBtn = {!post?.applied}
                  isFavourite = {post.isFavourite}
                  img = {item.base64Image}
                  //isChosen={idChosen == item.id}
                />
              ))}
            </Grid>
          </Grid>
        </Box>}
      </Box>
    )
}

export default DetailPost
