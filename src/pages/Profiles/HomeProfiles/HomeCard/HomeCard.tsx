import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

const MySpan = styled('span')({
  fontWeight: 'bolder'
})


export default function HomeCard() {
  return (
    <Card>
      <CardContent>
        <Typography>
          <MySpan>Tên nhà: </MySpan>
        </Typography>
        <Typography>
          <MySpan>Loại nhà: </MySpan>
        </Typography>
        <Typography>
          <MySpan>Diện tích sàn: </MySpan>
        </Typography>
        <Typography>
          <MySpan>Địa chỉ: </MySpan>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' variant='contained' color='success'>
          Chỉnh sửa
        </Button>
        <Button size='small' variant='contained' color='error'>
          Xóa
        </Button>
      </CardActions>
    </Card>
  )
}
