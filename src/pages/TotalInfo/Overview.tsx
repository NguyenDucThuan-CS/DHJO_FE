import { Box, Stack, Typography } from '@mui/material'
import Wrap from './Wrap'

const RowItem = ({ amount, title }: { amount: number; title: string }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
      <Box
        sx={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#D9D9D9',
          lineHeight: '60px',
          textAlign: 'center'
        }}
      >
        {amount}
      </Box>
      <Typography fontSize={'15px'} fontWeight={'bold'}>
        {title}
      </Typography>
    </Stack>
  )
}
export const Overview = () => {
  return (
    <Wrap title='Tổng quan' width={250}>
      <Stack direction={'column'} justifyItems={'center'} padding={'20px'} gap={'20px'} sx={{ background: '' }}>
        <RowItem amount={10} title='Tin đã đăng' />
        <RowItem amount={20} title='Ứng viên ứng tuyển' />
      </Stack>
    </Wrap>
  )
}
