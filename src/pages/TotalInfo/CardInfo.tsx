import { Box } from '@mui/material'

const CardInfo = ({title, color, number}:any) => {
    return  <Box
    sx={{
      background: color,
      width: '200px',
      height: '200px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'left'
    }}
  >
    <Box sx = {{padding: '20px'}}>
    <p style = {{fontSize: '50px', color: 'white', fontWeight: 'bold'}}>{number}</p>
    <p style={{ color: 'white', fontSize: '18px'}}>{title}</p>
   
    </Box>
    
  </Box>
}

export default CardInfo