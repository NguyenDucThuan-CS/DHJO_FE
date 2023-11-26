import DetailHelper from '../../pages/DetailHelper/DetailHelper'
import { Modal } from './Modal'
import { doCloseModal } from '../../redux/slice/modalDetai'
import { useDispatch } from 'react-redux'

const ModalDetailHelper = ({ open }: any) => {
  const dispatch = useDispatch()
  return <Modal open={open} Content={<DetailHelper />} handleClose={() => {
    dispatch(doCloseModal({}))
  }}></Modal>
}


export default ModalDetailHelper