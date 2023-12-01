//import { Modal } from './Modal'
import { doCloseModalRating } from '../../redux/slice/modalDetai'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { ListStar } from '../ListStar/ListStar'
import Textarea from '../TextArea/TextArea'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { rateHelper } from '../../apis/rating.api'
import { toast } from 'react-toastify'
import Modal from '@mui/material/Modal'
import { doCloseModal } from '../../redux/slice/modalDetai'
import DetailHelper from '../../pages/DetailHelper/DetailHelper'
const ModalRatingHelper = ({ open }: any) => {
  const [valueArea, setValueArea] = useState<string>('')
  const [numStar, setNumStar] = useState<number>(3)

  const { postRatingId } = useSelector((state: any) => {
    return state.modalHelperReducer
  })
  const handleClose = () => {
    dispatch(doCloseModal({}))
  }
  const dispatch = useDispatch()
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
