import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import { Padding } from '@mui/icons-material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CropDinIcon from '@mui/icons-material/CropDin'
import HomeIcon from '@mui/icons-material/Home'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Grid } from '@mui/material'
const MySpan = styled('span')({
  fontSize: '20px',
  paddingLeft: '18px'
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
  img?: string
}
const PREFIX = 'Demo'
const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`
}

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: 'center'
  }
}))
export const StyledAttachMoneyIcon = styled(AttachMoneyIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledHomeIcon = styled(HomeIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledCropDinIcon = styled(CropDinIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export const StyledLocationOnIcon = styled(LocationOnIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

export default function HomeCard({
  homeName,
  homeType,
  floorArea,
  address,
  edit,
  remove,
  id,
  choose,
  isChosen,
  img
}: HomeCardProps) {
  return (
    <Card>
      <CardContent sx={{ padding: 0, height: '220px' }}>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={5} md={5}>
            <Box
              component='img'
              sx={{
                width: '100%',
                height: '100%'
              }}
              alt='The house from the offer.'
              src={
                img
                  ? `data:image;base64,${img}`
                  : `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2`
              }
            />
          </Grid>

          <Grid item xs={7} sm={7} md={7} sx={{ paddingBottom: '10px' }}>
            <Typography sx={{ marginTop: '15px' }}>
              <MySpan>{homeName}</MySpan>
            </Typography>

            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledHomeIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                <span style={{fontSize:'14px'}}>{homeType}</span>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledCropDinIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                <span style={{fontSize:'14px'}}>{`${floorArea} m2`}</span>
              </Grid>
            </Grid>

            <Grid container alignItems='center'>
              <StyledGrid item xs={2} className={classes.textCenter}>
                <StyledLocationOnIcon className={classes.icon} />
              </StyledGrid>
              <Grid item xs={10}>
                <span style={{fontSize:'14px'}}>{`${address}`}</span>
              </Grid>
            </Grid>
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
