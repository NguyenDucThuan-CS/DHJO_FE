import { Box, Typography, Divider } from '@mui/material'
import { ReactNode } from 'react'

const Wrap = ({ title, children, width }: { title: string; children?: ReactNode; width: number }) => {
  return (
    <Box
      sx={{
        width: { width },
        //height: 200,
        border: '1px solid black',
        borderRadius: '20px',
        backgroundColor: '',
        boxShadow: '5px 10px 18px #888888'
      }}
    >
      <Typography align='center' padding={'10px'} fontWeight={'bold'}>
        {title}
      </Typography>
      <Divider sx={{ border: '3px solid yellow' }} />
      {children}
    </Box>
  )
}

export default Wrap
