import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { ListStar } from '../../components/ListStar/ListStar'
import { useState } from 'react'
import { Chip } from '@mui/material'
import Textarea from '../../components/TextArea/TextArea'

import { useSelector } from 'react-redux'
const DetailHelper = () => {
  const [tab, setTab] = useState<number>(1)
  const [valueArea, setValueArea] = useState<string>('')
  const [numStar, setNumStar] = useState<number>(0)

  const { helperInfo } = useSelector((state: any) => state.modalHelperReducer)
 
  const renderNumberStars = () => {
    if (helperInfo.overallRating.avgScore === -1) {
      return 3
    }
    return helperInfo.overallRating.avgScore
  }

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            component='img'
            sx={{
              width: '100%',
              height: '40%'
            }}
            alt='The house from the offer.'
            src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
          />
        </Grid>
        <Grid item xs={8}>
          <Stack
            height={'163px'}
            direction={'column'}
            justifyContent={'flex-end'}
            sx={{
              color: 'white',
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 52.31%, rgba(0, 0, 0, 0.8) 100%)'
            }}
          >
            <ListStar number={renderNumberStars() + 1} />
            <span style={{ padding: '5px' }}>{helperInfo.name}</span>
          </Stack>
          <Stack spacing={2} direction={'row'} sx={{ marginTop: '10px' }}>
            <Button variant={`${tab === 1 ? 'contained' : 'outlined'}`} onClick={() => setTab(1)}>
              Thông tin
            </Button>
            <Button variant={`${tab === 2 ? 'contained' : 'outlined'}`} onClick={() => setTab(2)}>
              Đánh giá
            </Button>
          </Stack>
          {tab === 1 ? (
            <Box>
              <Stack direction={'row'} sx={{ marginTop: '5px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '10px' }}>Ngày sinh:</span>{' '}
                <span style={{ fontSize: '18px' }}>{helperInfo.doB}</span>
              </Stack>

              <Stack direction={'row'} sx={{ marginTop: '5px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '10px' }}>Giới tính:</span>{' '}
                <span style={{ fontSize: '18px' }}>{helperInfo.gender}</span>
              </Stack>
              <Stack direction={'row'} sx={{ marginTop: '5px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '10px' }}>Trình độ:</span>{' '}
                <span style={{ fontSize: '18px' }}>{helperInfo.edu}</span>
              </Stack>
              <Stack direction={'row'} sx={{ marginTop: '5px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '10px' }}>Kĩ năng:</span>{' '}
                <Stack direction='row' spacing={1}>
                  {helperInfo.skill.map((item: any) => (
                    <Chip key={item.skillName} label={item.skillName} sx={{ fontSize: '12px' }} />
                  ))}
                </Stack>
              </Stack>
              <Stack direction={'row'} sx={{ marginTop: '5px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '10px' }}>Số điện thoại:</span>{' '}
                <span style={{ fontSize: '18px' }}>{helperInfo.phone}</span>
              </Stack>
            </Box>
          ) : (
            <Stack>
              {/* <p style={{ marginTop: '10px', marginBottom: '10px', fontSize: '17px', fontWeight: 'bold' }}>
                Đánh giá chất lượng ngv của bạn
              </p>
              <ListStar number={numStar + 1} onClick = {setNumStar} isSmallStar = {false}/>
              <p style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' }}>Đánh giá chung</p>
               <Textarea value={valueArea} onChange={setValueArea}/> */}
              {helperInfo.overallRating.typicalRatings.length === 0 && 'Chưa có đánh giá nha'}
              {helperInfo.overallRating.typicalRatings?.map((item: any) => (
                <Box
                  sx={{
                    background: '#F4FCFF',
                    marginTop: '10px',
                    width: '300px',
                    padding: '10px',
                    borderRadius: '15px'
                  }}
                >
                  <p style={{ color: 'black', fontWeight: 'bold' }}>Đánh giá 1</p>
                  <Stack direction={'row'}>
                    <span>4</span>
                    <ListStar number={4} />
                  </Stack>

                  <p>Good</p>
                </Box>
              ))}

              {/* <Box sx = {{background: "#F4FCFF", marginTop:"10px", width: '300px',padding: '10px', borderRadius: '15px'}}>
                <p style={{color: 'black', fontWeight: 'bold'}}>Đánh giá 1</p>
                <Stack direction={'row'}>
                  <span>4</span><ListStar number = {4}/>
                </Stack>
                <p>Good</p>
              </Box> */}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default DetailHelper