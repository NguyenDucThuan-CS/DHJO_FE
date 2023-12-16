//import { Modal } from './Modal'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import { doCloseModal } from '../../redux/slice/modalDetai'
import DetailHelper from '../../pages/DetailHelper/DetailHelper'
const ModalRatingHelper = ({ open }: any) => {
  const handleClose = () => {
    dispatch(doCloseModal({}))
  }
  const dispatch = useDispatch()
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx = {style}>
           <DetailHelper />
        </Box>
      </Modal>
    </>
  )
}

export default ModalRatingHelper
