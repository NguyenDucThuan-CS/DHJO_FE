import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { Box, Grid } from '@mui/material'

const MySpan = styled('span')({
  fontWeight: 'bolder'
})
interface Props {
  id: string
  name: string
  gender: {
    id: string
    name: string
  }
  birhday: string
  education: {
    id: string
    name: string
  }
  skills: {
    id: string
    skillName: string
  }[]
  edit?: (id: string) => void
  remove?: (id: string) => void
  choose?: (id: string, flag: boolean) => void
  isChosen?: boolean
}

const getSkills = (
  skills: {
    id: string
    skillName: string
  }[]
) => {
  return skills.reduce((total, current) => {
    return total + current.skillName
  }, '')
}

export default function HelperCard({ name, gender, birhday, education, skills, remove, id, choose, isChosen }: Props) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={5} md={5}>
            <Box
              component='img'
              sx={{
                width: '100%',
                height: '100%'
              }}
              alt='The house from the offer.'
              src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
            />
          </Grid>

          <Grid item xs={7} sm={7} md={7}>
            <Typography>
              <MySpan>{name}</MySpan>
            </Typography>
            <Typography>
              <MySpan>{gender.name}</MySpan>
            </Typography>
            <Typography>
              <MySpan> {birhday}</MySpan>
            </Typography>
            <Typography>
              <MySpan> {education.name}</MySpan>
            </Typography>
            <Typography>
              <MySpan> {getSkills(skills)}</MySpan>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
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
