import ListHomeCard, { House } from './ListHomeCard/ListHomeCard'
import { Box, Button } from '@mui/material'
import { Modal } from '../../../components/Modal/Modal'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Input } from '../../../components/Input/Input'
import SelectDropdown from '../../../components/SelectDropdown/SelectDown'
import { getAllProvine, getDistrictByProvince, getWardsByDistrict } from '../../../apis/address.api'
import { getHouseType } from '../../../apis/utils.api'
import Loading from '../../../components/Loading/Loading'
import { updateHouseOwner, getHousesOfOwer, getHouseById, deleteHouseById } from '../../../apis/house.api'
import { Popup } from '../../../components/Popup/Popup'
import { useForm } from 'react-hook-form'
import UploadImage from '../../../components/ImageUpload/ImageUpload'
import { updateHouseImg } from '../../../apis/img.api'
import { toast } from 'react-toastify'
import { toBase64 } from '../../../utils/common'
interface Province {
  code: string
  name: string
  slug: string
  type: string
}
type Ward = Omit<Province, 'slug'>
interface FormData {
  houseName: string
  floorArea: number
  houseNo: string
  street: string
}

const HomeProfiles = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const [listProvince, setListProvince] = useState<Province[]>([])
  const [listHouse, setListHouses] = useState<House[]>([])

  const [idProvince, setIdProvince] = useState<string>('0')
  const [houseTypes, setHouseTypes] = useState<{ id: string; name: string }[]>([])
  const [idHouseType, setIdHouseType] = useState<string>('0')

  const [listWard, setListWard] = useState<Ward[]>([])
  const [idWard, setIdWard] = useState<string>('0')

  const [listDistrict, setListDictrict] = useState<Ward[]>([])
  const [idDistrict, setIdDistrict] = useState<string>('0')

  const [isLoading, setIsLoading] = useState(true)
  const [idHouse, setIdHouse] = useState<null | string>(null)

  const [text, setText] = useState<string>('')
  const { register, getValues, setValue } = useForm<FormData>()
  const [img, setImg] = useState<any>('')

  useEffect(() => {
    setIsLoading(true)
    Promise.all([getAllProvine(), getHouseType(), getHousesOfOwer()]).then((res) => {
      setIsLoading(false)
      setListProvince(res[0].data.data)
      setHouseTypes(res[1].data.data)
      setListHouses(res[2].data.data)
    })
  }, [])

  useEffect(() => {
    if (idProvince !== '0') {
      setIsLoading(true)
      getDistrictByProvince(idProvince)
        .then((res) => {
          setIsLoading(false)
          setListDictrict(res.data.data)
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
        })
    } else {
      setListDictrict([])
      setIdDistrict('0')
    }
  }, [idProvince])

  useEffect(() => {
    if (idDistrict !== '0') {
      setIsLoading(true)
      getWardsByDistrict(idDistrict)
        .then((res) => {
          setIsLoading(false)
          setListWard(res.data.data)
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
        })
    } else {
      setListWard([])
      setIdWard('0')
    }
  }, [idDistrict])

 
// async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {

//   const res: Response = await fetch(dataUrl);
//   const blob: Blob = await res.blob();
//   return new File([blob], fileName, { type: 'image/png' });
// }

  const createNewHouse = () => {
    setIsLoading(true)
    updateHouseOwner({
      id: idHouse,
      houseName: getValues().houseName,
      houseType: houseTypes.find((item) => item.id === idHouseType),
      floorArea: Number(getValues().floorArea),
      houseNo: getValues().houseNo,
      street: getValues().street,
      ward: listWard.find((item) => item.code === idWard),
      district: listDistrict.find((item) => item.code === idDistrict),
      province: listProvince.find((item) => item.code === idProvince)
    })
      .then(async (res) => {
        setIsLoading(false)
        updateHouseImg({id: res.data.data.id, base64String: await toBase64(img)}).then((res) => {
          toast.success('Cập nhật căn nhà thành công')
        })
       
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        toast.error('Cập nhật căn nhà thất bại')
      })
  }

  const clearData = () => {
    setIdProvince('0')
    setIdHouseType('0')
    setIdWard('0')
    setIdDistrict('0')
    setValue('houseName', '')
    setValue('floorArea', 0)
    setValue('houseNo', '')
    setValue('street', '')
    setIdHouse(null)
  }

  const agree = () => {
    setOpenPopup(false)
    setOpen(false)
    clearData()
    getHousesOfOwer().then((res) => setListHouses(res.data.data))
  }

  const disagree = () => {
    setOpenPopup(false)
    setOpen(false)
    clearData()
    getHousesOfOwer().then((res) => setListHouses(res.data.data))
  }

  const close = () => {
    setOpenPopup(false)
    setOpen(false)
    clearData()
    getHousesOfOwer().then((res) => setListHouses(res.data.data))
  }

  
  const [initiImg, setInitImg] = useState('')

  const handleSetImg = (img: any) => {
    setImg(img)
  }

  const handleSetInitImg = (img: any) => {
    setInitImg(img)
  }

  const ContentModal = () => {
    return (
      <Box>
        <UploadImage handleSetImg={handleSetImg} initImg={initiImg} disabled = {false} handleSetInitImg = {handleSetInitImg}/>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Input
                label='Tên nhà'
                register={{
                  ...register('houseName')
                }}
              ></Input>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectDropdown list={houseTypes} id={idHouseType} setId={setIdHouseType} name={'Loại nhà'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Input
                label='Diện tích sàn (m2)'
                register={{
                  ...register('floorArea')
                }}
                type='number'
              ></Input>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectDropdown
                list={listProvince?.map((item) => ({
                  id: item.code,
                  name: item.name
                }))}
                id={idProvince}
                setId={setIdProvince}
                name={'Tỉnh/Thành phố'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectDropdown
                list={listDistrict.map((item) => ({
                  id: item.code,
                  name: item.name
                }))}
                name={'Quận huyện'}
                id={idDistrict}
                setId={setIdDistrict}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectDropdown
                list={listWard.map((item) => ({
                  id: item.code,
                  name: item.name
                }))}
                name={'Phường/xã'}
                id={idWard}
                setId={setIdWard}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Input
                label='Số nhà'
                register={{
                  ...register('houseNo')
                }}
              ></Input>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Input
                label='Tên đường'
                register={{
                  ...register('street')
                }}
              ></Input>
            </Grid>
          </Grid>
        </form>
      </Box>
    )
  }
 
 
  const ActionsModal = () => {
    return (
      <Button variant='outlined' onClick={createNewHouse}>
        {idHouse ? 'Cập nhật' : 'Tạo mới'}
      </Button>
    )
  }
 
  const editHome = async (id: string) => {
    const res = await getHouseById({ id })
    const data = res.data.data
    setIdHouse(data.id)
    setIdProvince(data.province.code)
    setIdProvince(data.province.code)
    setIdHouseType(data.houseType.id)
    setIdWard(data.ward.code)
    setIdDistrict(data.district.code)

    if(data.image) setInitImg(`data:image;base64,${data.image.base64String}`)
    setValue('houseName', data.houseName)
    setValue('floorArea', data.floorArea)
    setValue('houseNo', data.houseNo)
    setValue('street', data.street)
    setOpen(true)
  }

  const removeHome = (id: string) => {
    deleteHouseById({ houseId: id }).then(() => {
      setText('Xóa căn nhà thành công')
      setOpenPopup(true)
    })
  }

  return (
    <Box>
      <Button variant='outlined' sx={{ mb: '15px' }} onClick={() => setOpen(true)}>
        Thêm mới +
      </Button>
      <ListHomeCard listHouses={listHouse} edit={editHome} remove={removeHome} />
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        Content={<ContentModal></ContentModal>}
        Actions={<ActionsModal></ActionsModal>}
      />

      <Modal open={isLoading} Content={<Loading></Loading>} />
      <Popup open={openPopup} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
    </Box>
  )
}

export default HomeProfiles
