import Loading from '../Loading/Loading'
import { Modal } from '@mui/material'
import { styled } from '@mui/system'
export const ModalLoading = ({ isLoading }: any) => {

  const StyledModal = styled(Modal)({
    //fontWeight: 'bolder',
    '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': {
      background: 'none'
    }
   
  })
  return (
    <StyledModal open={isLoading}>
      <Loading />
    </StyledModal>
  )
}
