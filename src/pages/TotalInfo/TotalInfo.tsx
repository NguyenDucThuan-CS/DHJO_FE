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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

export function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
const TotalInfo = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Stack gap={'20px'} direction={'row'} flexWrap={'wrap'} alignItems={'flex-start'} justifyContent={'center'}>
        <CardInfo title={'Tổng số bài đăng'} color='#fbc733' number={10} />
        <CardInfo title={'Tổng tiền đã chi'} color='#4286f4' number={20000} />
        <CardInfo title={'Tổng chờ xác nhận'} color='#eb4235' number={1} />
        <CardInfo title={'Tổng đã hoàn thành'} color='#fbc733' number={1} />
        <CardInfo title={'Tổng sắp quá hạn'} color='#fbc733' number={1} />
      </Stack>
      <Box sx={{ width: '70%', margin: 'auto', marginTop: '20px' }}>
        <DenseTable />
        <Stack direction={'row'} sx = {{marginTop:'20px'}}>
          <Button variant={'contained'}>Tin đăng sắp quá hạn</Button>
          <Button>Tin đăng đã hoàn thành</Button>
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
