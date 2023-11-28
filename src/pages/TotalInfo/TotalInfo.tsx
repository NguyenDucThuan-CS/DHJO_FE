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
import ListHelperCard from '../FavoriteHelpers/ListHelperCard/ListHelperCard'
import Nofind from '../../components/NoFind/NoFind'

const renderHelper = (helpers: any) => {
  return helpers.map((helper: any) => (
    <>
      <div><img src = {`data:image;base64,${helper.base64Image}`} style={{marginRight:'5px'}}/>{helper.name}</div>
    </>
  ))
}
export function WaitingNews(list: any) {
  if (!list.list?.length) return <Nofind />
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' sx = {{fontSize: '17px', fontWeight: 'bold'}}>Tin đăng</TableCell>
            <TableCell align='center' sx = {{fontSize: '17px', fontWeight: 'bold'}}>Tên căn nhà</TableCell>
            <TableCell align='center' sx = {{fontSize: '17px', fontWeight: 'bold'}}>Ngày làm việc</TableCell>
            <TableCell align='center' sx = {{fontSize: '17px', fontWeight: 'bold'}}>Người giúp việc đăng kí</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.list.map((item: any) => (
            <TableRow key={''} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row' align='center'>
                {item.content}
              </TableCell>
              <TableCell align='center'>{item.house.houseName}</TableCell>
              <TableCell align='center'>{`${item.startDate.day}-${item.startDate.month}-${item.startDate.year}`}</TableCell>
              <TableCell align='center'>{renderHelper(item.helpers)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function FinishedNews(list: any) {
  if (!list.list?.length) return <Nofind />
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Tin đăng</TableCell>
            <TableCell align='center'>Tên căn nhà</TableCell>
            <TableCell align='center'>Ngày làm việc</TableCell>
            <TableCell align='center'>Người giúp việc đăng kí</TableCell>
            <TableCell align='center'>Đánh giá người giúp việc</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={''} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component='th' scope='row'>
              {''}
            </TableCell>
            <TableCell align='center'>{''}</TableCell>
            <TableCell align='center'>{''}</TableCell>
            <TableCell align='center'>{''}</TableCell>
            <TableCell align='center'>{''}</TableCell>
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
    <>
      <Box sx={{ width: '80%', margin: 'auto' }}>
        <Stack gap={'20px'} direction={'row'} flexWrap={'wrap'} justifyContent={'space-between'}>
          <CardInfo title={'Tổng số tin đăng trong tháng'} color='#fbc733' number={dashboardInfo?.totalPostNumber} />
          <CardInfo title={'Tổng tiền đã chi trong tháng'} color='#4286f4' number={dashboardInfo?.totalFeeSpent} />
          <CardInfo title={'Tin chờ xác nhận'} color='#eb4235' number={dashboardInfo?.confirmingPostsNumber} />
          <CardInfo title={'Tin chờ đánh giá'} color='#59b76e' number={dashboardInfo?.finishedPostsNumber} />
          <CardInfo title={'Tin sắp quá hạn'} color='#6f3ad8' number={dashboardInfo?.expiringPostsNumber} />
        </Stack>
        <Box sx={{ marginTop: '20px' }}>
          <Stack direction={'row'} sx={{ marginTop: '20px', marginBottom: '20px', gap: '20px' }}>
            <Button variant={tab === 0 ? 'contained' : 'outlined'} onClick={() => setTab(0)}>
              Tin chờ xác nhận
            </Button>
            <Button variant={tab === 1 ? 'contained' : 'outlined'} onClick={() => setTab(1)}>
              Tin chờ đánh giá
            </Button>
          </Stack>
          {tab === 0 ? (
            <WaitingNews list={dashboardInfo?.posts?.filter((item: any) => item.applied === true)} />
          ) : (
            <FinishedNews list={dashboardInfo?.posts?.filter((item: any) => item.comfirmed === true)} />
          )}
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <div style={{fontWeight: 'bold', fontSize:'20px', marginBottom:'10px'}}>Người giúp việc hàng đầu</div>
          {dashboardInfo?.topRatedHelpers.length ? <ListHelperCard listHelpers = {dashboardInfo?.topRatedHelpers}/>:<Nofind />}
        </Box>
      </Box>
      <Box
        sx={{ position: 'sticky', bottom: '20px', display: 'flex', justifyContent: 'flex-end' }}
        onClick={() => navigate('/owner/create-news')}
      >
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
    </>
  )
}

export default TotalInfo
