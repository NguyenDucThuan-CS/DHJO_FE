import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  hideSrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
}))

export default useStyles
