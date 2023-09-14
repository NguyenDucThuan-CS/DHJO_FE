import LabTabs from './TabsBar'
import { Box, Typography } from '@mui/material'

const Profiles = () => {
  return (
    <Box className='profiles'>
      <Typography variant='h6'>Quản lí hồ sơ</Typography>
      <LabTabs />
    </Box>
  )
}

export default Profiles
