import LabTabs from './TabsBar'
import { Box, Typography } from '@mui/material'

const ProfileHelper = () => {
  return (
    <Box className='profiles'>
      <Typography variant='h6'>Quản lí hồ sơ</Typography>
      <LabTabs />
    </Box>
  )
}

export default ProfileHelper
