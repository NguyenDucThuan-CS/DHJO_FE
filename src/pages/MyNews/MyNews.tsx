import { Stack, Box, Button, Grid } from '@mui/material'
import { useState } from 'react'
import { useResposive } from '../../utils/hook'
//import CardPost from '../../components/CardPost/CardPost'
import DetailPost from '../Helpers/DetailPost'

const MyNews = () => {
  const { isFromMd } = useResposive()
  const [tab, setTab] = useState<number>(0)
  return (
    <Box>
      <Stack direction={'row'} gap={2} sx={{ marginBottom: '20px' }}>
        <Button variant={`${tab === 0 ? 'contained' : 'outlined'}`} onClick={() => setTab(0)}>
          Tất cả
        </Button>
        <Button variant={`${tab === 1 ? 'contained' : 'outlined'}`} onClick={() => setTab(1)}>
          Tin mới đăng
        </Button>
        <Button variant={`${tab === 2 ? 'contained' : 'outlined'}`} onClick={() => setTab(2)}>
          Tin chờ xác nhận
        </Button>
        <Button variant={`${tab === 3 ? 'contained' : 'outlined'}`} onClick={() => setTab(3)}>
          Tin đã xác nhận
        </Button>
        <Button variant={`${tab === 4 ? 'contained' : 'outlined'}`} onClick={() => setTab(4)}>
          Tin đã hoàn thành
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          {/* <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost /> */}
        </Grid>
        {isFromMd && (
          <Grid item xs={7}>
            <DetailPost />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
export default MyNews
