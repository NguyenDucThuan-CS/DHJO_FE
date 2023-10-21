import { Container, Stack } from '@mui/material'
import { Overview } from './Overview'
import { OverdueNews } from './OverdueNews'
import { WaitingNews } from './WaitingNews'

const TotalInfo = () => {
  return (
    <Container>
      <Stack direction={'row'} gap={'20px'} alignItems={'flex-start'} justifyContent={'center'}>
        <Overview />
        <OverdueNews />
        <WaitingNews />
      </Stack>
      <Stack direction={'row'} gap={'20px'} alignItems={'flex-start'} justifyContent={'center'} marginTop={'20px'}>
        <Overview />
        <WaitingNews />
      </Stack>
    </Container>
  )
}

export default TotalInfo
