import { Modal } from './Modal'
import { doCloseModalRating } from '../../redux/slice/modalDetai'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { ListStar } from '../ListStar/ListStar'
import Textarea from '../TextArea/TextArea'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { rateHelper } from '../../apis/rating.api'
import { toast } from 'react-toastify'


const ModalRatingHelper = ({ open }: any) => {
  const [valueArea, setValueArea] = useState<string>('')
  const [numStar, setNumStar] = useState<number>(3)

  const { postRatingId } = useSelector((state: any) => {
    return state.modalHelperReducer
  })

  const ContentRating = () => {
    return (
      <Box>
        <p style={{ marginTop: '10px', marginBottom: '10px', fontSize: '17px', fontWeight: 'bold' }}>
          Đánh giá chất lượng ngv của bạn
        </p>
        <ListStar number={numStar + 1} onClick={setNumStar} isSmallStar={false} />
        <p style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' }}>Đánh giá chung</p>
        <Textarea value={valueArea} onChange={setValueArea} />
      </Box>
    )
  }
  const Actions = () => {
    return (
      <Button
        onClick={() => {
          rateHelper(postRatingId, {
            score: numStar + 1,
            comment: valueArea
          }).then(() => {
            toast('Đánh giá người giúp việc thành công')
          })
          .then(() => {
            toast('Đã có lỗi xảy ra')
          })
          .finally(() => {
            dispatch(doCloseModalRating({}))
          })
        }}
      >
        Đánh giá
      </Button>
    )
  }
  const dispatch = useDispatch()
  return (
    <Modal
      open={open}
      Content={<ContentRating />}
      Actions={<Actions />}
      handleClose={() => {
        dispatch(doCloseModalRating({}))
      }}
    ></Modal>
  )
}

export default ModalRatingHelper
