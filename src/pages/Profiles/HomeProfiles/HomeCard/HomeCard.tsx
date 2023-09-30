import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

const MySpan = styled('span')({
  fontWeight: 'bolder'
})
interface HomeCardProps {
  id: string
  homeName: string
  homeType: string
  floorArea: number
  address: string
  edit?: (id: string) => void
  remove?: (id: string) => void
  choose?: (id: string, flag: boolean) => void
  isChosen?: boolean
}
export default function HomeCard({
  homeName,
  homeType,
  floorArea,
  address,
  edit,
  remove,
  id,
  choose,
  isChosen
}: HomeCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography>
          <MySpan>Tên nhà: {homeName}</MySpan>
        </Typography>
        <Typography>
          <MySpan>Loại nhà: {homeType}</MySpan>
        </Typography>
        <Typography>
          <MySpan>Diện tích sàn: {floorArea}</MySpan>
        </Typography>
        <Typography>
          <MySpan>Địa chỉ: {address}</MySpan>
        </Typography>
      </CardContent>
      <CardActions>
        {edit && (
          <Button size='small' variant='contained' color='success' onClick={() => edit(id)}>
            Chỉnh sửa
          </Button>
        )}
        {remove && (
          <Button size='small' variant='contained' color='error' onClick={() => remove(id)}>
            Xóa
          </Button>
        )}
        {choose && !isChosen && (
          <Button size='small' variant='contained' color='warning' onClick={() => choose(id, true)}>
            Chọn
          </Button>
        )}

        {choose && isChosen && (
          <Button size='small' variant='contained' color='inherit' onClick={() => choose(id, false)}>
            Bỏ chọn
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
