import { Stack, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import CardInfo from './CardInfo'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useState, useEffect } from 'react'
import getDashboardInfo from '../../apis/dashboard.api'
import HelperCard from '../FavoriteHelpers/HelperCard/HelperCard'

export function WaitingNews(list: any) {
  if (!list.length) return <div>Chưa có tin đăng</div>
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Tin đăng</TableCell>
            <TableCell align='right'>Tên căn nhà</TableCell>
            <TableCell align='right'>Ngày làm việc</TableCell>
            <TableCell align='right'>Người giúp việc đăng kí</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={''} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component='th' scope='row'>
              {''}
            </TableCell>
            <TableCell align='right'>{''}</TableCell>
            <TableCell align='right'>{''}</TableCell>
            <TableCell align='right'>{''}</TableCell>
            <TableCell align='right'>{''}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function FinishedNews(list: any) {
  if (!list.length) return <div>Chưa có tin đăng</div>
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Tin đăng</TableCell>
            <TableCell align='right'>Tên căn nhà</TableCell>
            <TableCell align='right'>Ngày làm việc</TableCell>
            <TableCell align='right'>Người giúp việc đăng kí</TableCell>
            <TableCell align='right'>Đánh giá người giúp việc</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={''} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component='th' scope='row'>
              {''}
            </TableCell>
            <TableCell align='right'>{''}</TableCell>
            <TableCell align='right'>{''}</TableCell>
            <TableCell align='right'>{''}</TableCell>
            <TableCell align='right'>{''}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
const TotalInfo = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [dashboardInfo, setDasboardInfo] = useState<any>()

  useEffect(() => {
    getDashboardInfo().then((res) => {
      setDasboardInfo(res.data.data)
    })
  }, [])
  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Stack gap={'20px'} direction={'row'} flexWrap={'wrap'} justifyContent={'space-between'}>
        <CardInfo title={'Tổng số bài đăng'} color='#fbc733' number={dashboardInfo?.totalPostNumber} />
        <CardInfo title={'Tổng tiền đã chi'} color='#4286f4' number={dashboardInfo?.totalFeeSpent} />
        <CardInfo title={'Tổng chờ xác nhận'} color='#eb4235' number={dashboardInfo?.confirmingPostsNumber} />
        <CardInfo title={'Tổng đã hoàn thành'} color='#59b76e' number={dashboardInfo?.finishedPostsNumber} />
        <CardInfo title={'Tổng sắp quá hạn'} color='#6f3ad8' number={dashboardInfo?.expiringPostsNumber} />
      </Stack>
      <Box sx={{ marginTop: '20px' }}>
        <Stack direction={'row'} sx={{ marginTop: '20px', marginBottom: '20px', gap: '20px' }}>
          <Button variant={tab === 0 ? 'contained' : 'outlined'} onClick={() => setTab(0)}>
            Tin chờ xác nhận
          </Button>
          <Button variant={tab === 1 ? 'contained' : 'outlined'} onClick={() => setTab(1)}>
            Tin đã hoàn thành
          </Button>
        </Stack>
        {tab === 0 ? (
          <WaitingNews list={dashboardInfo?.posts?.map((item: any) => item.applied === true)} />
        ) : (
          <FinishedNews list={dashboardInfo?.posts?.map((item: any) => item.confirmed === true)} />
        )}
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <div>Top rated NGV</div>
        <Stack direction={'row'} gap='20px'>
          {/* <HelperCard /> */}
        </Stack>
      </Box>

      <Box
        sx={{ position: 'sticky', bottom: '20px', display: 'flex', justifyContent: 'flex-end' }}
        onClick={() => navigate('/owner/create-news')}
      >
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}

export default TotalInfo
