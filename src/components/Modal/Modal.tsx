import * as React from 'react'

import { Dialog, DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import useStyles from './style'
interface PopupProps {
  open: boolean
  Content?: React.ReactNode
  Actions?: React.ReactNode
  handleClose?: () => void
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export const Modal: React.FC<PopupProps> = ({ open, Content, Actions, handleClose }) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
      className={classes.maxWith}
      
    >
      <DialogContent >{Content}</DialogContent>
      {Actions && <DialogActions>{Actions}</DialogActions>}
    </Dialog>
  )
}
