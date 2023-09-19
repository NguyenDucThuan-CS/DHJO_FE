import * as React from 'react'

import { Dialog, DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

interface PopupProps {
  open: boolean
  Content: React.ReactNode
  Actions: React.ReactNode
  handleClose: () => void
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
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogContent>{Content}</DialogContent>
      <DialogActions>{Actions}</DialogActions>
    </Dialog>
  )
}
