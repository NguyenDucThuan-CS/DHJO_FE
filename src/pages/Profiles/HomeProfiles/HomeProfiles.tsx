import ListHomeCard from './ListHomeCard/ListHomeCard'
import { Box, Button } from '@mui/material'
const HomeProfiles = () => {
  return (
    <Box>
      <Button variant='outlined' sx={{ mb: '15px' }}>
        Thêm mới +
      </Button>
      <ListHomeCard />
    </Box>
  )
}

export default HomeProfiles
