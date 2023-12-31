import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

export default function Loading() {
  return (
    <Box sx={{ display: 'flex' ,alignItems:'center', justifyContent:'center', width:'100%', height:'100%'}}>
      <CircularProgress />
    </Box>
  );
}