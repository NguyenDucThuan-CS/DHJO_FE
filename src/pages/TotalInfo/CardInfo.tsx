import { Box } from '@mui/material'

const CardInfo = ({title, color, number}:any) => {
    return  <Box
    sx={{
      background: color,
      width: 'auto',
      height: '100px',
      borderRadius: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    }}
  >
    <Box sx = {{padding: '20px'}}>
    <p style={{ color: 'white', fontSize: '20px'}}>{title}</p>
    <p style = {{fontSize: '50px', color: 'white', fontWeight: 'bold'}}>{number}</p>
    </Box>
    
  </Box>
}

export default CardInfo