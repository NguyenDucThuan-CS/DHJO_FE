import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: `0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)`,
    padding: '0.5rem'
  },
  tabPanel: {
    padding: '1.5rem 0px 0px !important' 
  }
}))

export default useStyles
