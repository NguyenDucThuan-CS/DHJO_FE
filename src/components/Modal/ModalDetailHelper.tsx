import DetailHelper from '../../pages/DetailHelper/DetailHelper'
import { Modal } from './Modal'
interface Props {
  open: boolean
}
const ModalDetailHelper = ({ open }: Props) => {
  return <Modal open={open} Content={<DetailHelper />}></Modal>
}


export default ModalDetailHelper