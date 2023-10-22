import { Container, Stack, Button } from '@mui/material'
import { Overview } from './Overview'
import { OverdueNews } from './OverdueNews'
import { WaitingNews } from './WaitingNews'
import { useNavigate } from 'react-router-dom'

const TotalInfo = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Button
          onClick={() => navigate('/owner/create-news')}
          variant='contained'
          sx={{ marginRight: '0px', marginBottom: '20px' }}
        >
          Tạo tin đăng
        </Button>
      </Stack>

      <Stack gap={'20px'} direction={'row'} flexWrap={'wrap'} alignItems={'flex-start'} justifyContent={'center'}>
        <Overview />
        <OverdueNews />
        <WaitingNews />
        <Overview />
        <WaitingNews />
      </Stack>
    </Container>
  )
}

export default TotalInfo
