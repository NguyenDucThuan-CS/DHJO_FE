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


const ModalRatingHelper = ({ open }: any) => {
  const [valueArea, setValueArea] = useState<string>('')
  const [numStar, setNumStar] = useState<number>(3)

  const { postRatingId } = useSelector((state: any) => {
    return state.modalHelperReducer
  })
  const handleClose = () => {
    dispatch(doCloseModalRating({}))
  }
  //const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const ContentRating = () => {
  //   return (
  //     <Box>
  //       <p style={{ marginTop: '10px', marginBottom: '10px', fontSize: '17px', fontWeight: 'bold' }}>
  //         Đánh giá chất lượng ngv của bạn
  //       </p>
  //       <ListStar number={numStar + 1} onClick={setNumStar} isSmallStar={false} />
  //       <p style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' }}>Đánh giá chung</p>
  //       <Textarea value={valueArea} onChange={setValueArea} />
  //     </Box>
  //   )
  // }
  // const Actions = () => {
  //   return (
  //     <Button
  //       onClick={() => {
  //         rateHelper(postRatingId, {
  //           score: numStar + 1,
  //           comment: valueArea
  //         })
  //           .then(() => {
  //             toast('Đánh giá người giúp việc thành công')
  //           })
  //           .then(() => {
  //             toast('Đã có lỗi xảy ra')
  //           })
  //           .finally(() => {
  //             dispatch(doCloseModalRating({}))
  //           })
  //       }}
  //     >
  //       Đánh giá
  //     </Button>
  //   )
  // }
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
          <Box>
            <p style={{ marginTop: '10px', marginBottom: '10px', fontSize: '17px', fontWeight: 'bold' }}>
              Đánh giá chất lượng ngv của bạn
            </p>
            <ListStar number={numStar + 1} onClick={setNumStar} isSmallStar={false} />
            <p style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' }}>Đánh giá chung</p>
            <Textarea value={valueArea} onChange={setValueArea} />
          </Box>
          <Button
            onClick={() => {
              console.log("122345")
              rateHelper(postRatingId, {
                score: numStar + 1,
                comment: valueArea
              })
                .then(() => {
                  toast('Đánh giá người giúp việc thành công')
                })
                .catch(() => {
                  toast('Đã có lỗi xảy ra')
                })
                .finally(() => {
                  dispatch(doCloseModalRating({}))
                })
            }}
          >
            Đánh giá
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default ModalRatingHelper
