import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background:'white',
    padding: '0.5rem',
    position: 'relative'
  },
  tabPanel: {
    padding: '1.5rem 0px 0px !important' 
  }
}))

export default useStyles
