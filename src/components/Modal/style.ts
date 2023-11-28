import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  hideSrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  maxWith: {
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper' : {
      maxWidth: 'unset',
      '& ::-webkit-scrollbar': {
        display: 'none'
      }
    }
  }
}))

export default useStyles
