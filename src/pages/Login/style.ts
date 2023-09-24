import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  size: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px',
    width:'100%'
  },
  avatar: {},
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  field: {
    padding: '14px'
  },
  submit: {
    width: 'fit-content',
    margin: 'auto'
  }
}))

export default useStyles
