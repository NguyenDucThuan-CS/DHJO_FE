import { Stack, Box } from '@mui/material'
import { Overview } from './Overview'
import { OverdueNews } from './OverdueNews'
import { WaitingNews } from './WaitingNews'
import { useNavigate } from 'react-router-dom'
import MostFavoriteHelper from './FavoriteHelper'
import MostFavoriteProfile from './FavoriteProfile'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
const TotalInfo = () => {
  const navigate = useNavigate()
  return (
    <Box>
      {/* <Stack direction={'row'} justifyContent={'flex-end'}>
        <Button
          onClick={() => navigate('/owner/create-news')}
          variant='contained'
          sx={{ marginRight: '0px', marginBottom: '20px' }}
        >
          Tạo tin đăng
        </Button>
      </Stack> */}

      <Stack gap={'20px'} direction={'row'} flexWrap={'wrap'} alignItems={'flex-start'} justifyContent={'center'}>
        <Overview />
        <OverdueNews />
        <WaitingNews />
        <MostFavoriteHelper />
        <MostFavoriteProfile />
      </Stack>
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
