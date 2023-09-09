import * as React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

interface PopupProps {
  open: boolean
  handleClose: () => void
  handleAgree: () => void
  handleDisAgree: () => void
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export const Popup: React.FC<PopupProps> = ({ open, handleClose, handleAgree, handleDisAgree }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          Bạn đã đăng kí thành công. Bạn có muốn đăng nhập?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisAgree}>Cancel</Button>
        <Button onClick={handleAgree}>Đồng ý</Button>
      </DialogActions>
    </Dialog>
  )
}
