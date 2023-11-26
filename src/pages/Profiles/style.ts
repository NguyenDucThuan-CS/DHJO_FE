import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    background: 'white',
    padding: '0.5rem',
    position:'relative',
    height: '500px'
  },
  tabPanel: {
    padding: '1.5rem 0px 0px !important' 
  }
}))

export default useStyles
