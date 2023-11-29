import { Box } from '@mui/material'

const CardInfo = ({title, color, number, isMoney}:any) => {
    return  <Box
    sx={{
      background: color,
      width: '200px',
      height: '200px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'left',
      boxShadow: '17px 10px 15px -3px rgba(0,0,0,0.1);'
    }}
  >
    <Box sx = {{padding: '20px'}}>
    <p style = {{fontSize: '50px', color: 'white', fontWeight: 'bold'}}>{number} {isMoney && 'vnd'}</p>
    <p style={{ color: 'white', fontSize: '18px'}}>{title}</p>
   
    </Box>
    
  </Box>
}

export default CardInfo