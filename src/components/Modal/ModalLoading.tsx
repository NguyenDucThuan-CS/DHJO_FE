import Loading from '../Loading/Loading'
import { Modal } from '@mui/material'
import { styled } from '@mui/system'
export const ModalLoading = ({ isLoading }: any) => {

  const StyledModal = styled(Modal)({
    // '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': {
    //   // background: 'none',
    //   position: 'relative',
    //   width: '100%',
    //   height: '100%'
    // },
    '& .css-ew73zq-MuiModal-root-MuiDialog-root':  {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0
    }
   
  })
  return (
    <StyledModal open={isLoading}>
      <Loading />
    </StyledModal>
  )
}
