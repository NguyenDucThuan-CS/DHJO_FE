import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
interface AvatarProps {
  setImg: (img:any) => void
}

const useStyles = makeStyles(() => ({
  root: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  input: {
    display: 'none'
  },
  large: {
    width: '70px',
    height: '70px'
  }
}))

export default function AvatarChooser({ setImg }: AvatarProps) {
  const classes = useStyles()
  const [src, setSrc] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSrc(URL.createObjectURL(event.target.files[0]))
      setImg(event.target.files[0])
    }
  }

  return (
    <div className={classes.root}>
      <input accept='image/*' className={classes.input} id='icon-button-file' type='file' onChange={handleChange} />
      <label htmlFor='icon-button-file'>
        <IconButton color='primary' aria-label='upload picture' component='span'>
          <Avatar src={src} className={classes.large} />
        </IconButton>
      </label>
    </div>
  )
}
