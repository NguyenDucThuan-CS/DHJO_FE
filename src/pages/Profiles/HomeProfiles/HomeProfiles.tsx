import ListHomeCard, { House } from './ListHomeCard/ListHomeCard'
import { Box, Button } from '@mui/material'
//import { Modal } from '../../../components/Modal/Modal'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Input } from '../../../components/Input/Input'
import SelectDropdown from '../../../components/SelectDropdown/SelectDown'
import { getAllProvine, getDistrictByProvince, getWardsByDistrict } from '../../../apis/address.api'
import { getHouseType } from '../../../apis/utils.api'
import { updateHouseOwner, getHousesOfOwer, getHouseById, deleteHouseById } from '../../../apis/house.api'
import { Popup } from '../../../components/Popup/Popup'
import { useForm } from 'react-hook-form'
import UploadImage from '../../../components/ImageUpload/ImageUpload'
import { updateHouseImg } from '../../../apis/img.api'
import { toast } from 'react-toastify'
import { toBase64 } from '../../../utils/common'
import Modal from '@mui/material/Modal'
import { ModalLoading } from '../../../components/Modal/ModalLoading'
import Loading from '../../../components/Loading/Loading'
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
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
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

  const [houseName, setHouseName] = useState<string>('')
  const [houseNo, setHouseNo] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [floorArea, setFloorArea] = useState<string>('')

  const [nameErr, setNameErr] = useState<string>('')
  const [houseTypeErr, setHouseTypeErr] = useState<string>('')
  const [floorAreaErr, setFloorAreaErr] = useState<string>('')
  const [provinceErr, setProvineErr] = useState<string>('')
  const [districtErr, setDistrictErr] = useState<string>('')
  const [wardErr, setWardErr] = useState<string>('')
  const [houseNoErr, setHouseErr] = useState<string>('')
  const [streetErr, setStreetErr] = useState<string>('')

  const validate = () => {
    let isValid = true
    if (!houseName) {
      isValid = false
      setNameErr('Vui lòng nhập tên nhà')
    }

    if (idHouseType == '0') {
      isValid = false
      setHouseTypeErr('Vui lòng nhập loại nhà')
    }

    if (!floorArea) {
      isValid = false
      setFloorAreaErr('Vui lòng nhập diện tích sàn')
    }

    if (idProvince == '0') {
      isValid = false
      setProvineErr('Vui lòng chọn tỉnh')
    }

    if (idDistrict == '0') {
      isValid = false
      setDistrictErr('Vui lòng chọn quận/huyện')
    }

    if (idWard == '0') {
      isValid = false
      setWardErr('Vui lòng chọn phường/xã')
    }

    if (!houseNo) {
      isValid = false
      setHouseErr('Vui lòng chọn số nhà')
    }

    if (!street) {
      isValid = false
      setStreetErr('Vui lòng nhập tên đường')
    }

    return isValid
  }
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

  const createNewHouse = () => {
    if (validate()) {
      setIsLoading(true)
      updateHouseOwner({
        id: idHouse,
        houseName: houseName,
        houseType: houseTypes.find((item) => item.id === idHouseType),
        floorArea: Number(floorArea),
        houseNo: houseNo,
        street: street,
        ward: listWard.find((item) => item.code === idWard),
        district: listDistrict.find((item) => item.code === idDistrict),
        province: listProvince.find((item) => item.code === idProvince)
      })
        .then(async (res) => {
          setIsLoading(false);
          setOpen(false);
          if (!img) {
            toast.success('Cập nhật căn nhà thành công')
            getHousesOfOwer().then((res) => setListHouses(res.data.data))
            setOpenPopup(false)
          }
          if (img)
            updateHouseImg({ id: res.data.data.id, base64String: await toBase64(img) }).then((res) => {
              toast.success('Cập nhật căn nhà thành công')
              getHousesOfOwer().then((res) => setListHouses(res.data.data))
              setOpenPopup(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false);
          setOpen(false);
          toast.error('Cập nhật căn nhà thất bại')
        })
    }
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
    setImg('')
    setInitImg('')
    setHouseName('')
    setHouseNo('')
    setStreet('')
    setFloorArea('')

    setNameErr('')
    setHouseTypeErr('')
    setFloorAreaErr('')
    setProvineErr('')
    setDistrictErr('')
    setWardErr('')
    setHouseErr('')
    setStreetErr('')
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

  
  const editHome = async (id: string) => {
    setIsLoading(true);
    const res = await getHouseById({ id })
    setIsLoading(false);
    const data = res.data.data
    setIdHouse(data.id)
    setIdProvince(data.province.code)
    setIdProvince(data.province.code)
    setIdHouseType(data.houseType.id)
    setIdWard(data.ward.code)
    setIdDistrict(data.district.code)

    if (data.image) setInitImg(`data:image;base64,${data.image.base64String}`)
    setHouseName(data.houseName)
    setFloorArea(data.floorArea)
    setHouseNo(data.houseNo)
    setStreet(data.street)

    setOpen(true)
  }

  const removeHome = (id: string) => {
    deleteHouseById({ houseId: id }).then(() => {
      toast.success('Xóa căn nhà thành công')
      getHousesOfOwer().then((res) => setListHouses(res.data.data))
      setOpenPopup(false)
    })
  }

  return (
    <Box>
      <Button
        variant='outlined'
        sx={{ mb: '15px' }}
        onClick={() => {
          clearData()
          setOpen(true)
        }}
      >
        Thêm mới +
      </Button>
      {!isLoading ?<ListHomeCard listHouses={listHouse} edit={editHome} remove={removeHome} />:<Loading></Loading>}
      {/* <Modal
        open={open}
        handleClose={() => setOpen(false)}
        Content={<ContentModal></ContentModal>}
        Actions={<ActionsModal></ActionsModal>}
      /> */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box>
            <UploadImage
              handleSetImg={handleSetImg}
              initImg={initiImg}
              disabled={false}
              handleSetInitImg={handleSetInitImg}
            />
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Input
                    label='Tên nhà'
                    value={houseName}
                    onChange={(e) => {
                      setHouseName(e.target.value)
                      setNameErr('')
                    }}
                    error={nameErr ? true : false}
                    helperText={nameErr}
                  ></Input>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <SelectDropdown
                    list={houseTypes}
                    id={idHouseType}
                    setId={(newValue) => {
                      setIdHouseType(newValue)
                      setHouseTypeErr('')
                    }}
                    name={'Loại nhà'}
                    error={houseTypeErr ? true : false}
                    helperText={houseTypeErr}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Input
                    label='Diện tích sử dụng (m2)'
                    value={floorArea}
                    onChange={(e) => {
                      setFloorArea(e.target.value)
                      setFloorAreaErr('')
                    }}
                    type='number'
                    error={floorAreaErr ? true : false}
                    helperText={floorAreaErr}
                  ></Input>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <SelectDropdown
                    list={listProvince?.map((item) => ({
                      id: item.code,
                      name: item.name
                    }))}
                    id={idProvince}
                    setId={(newValue) => {
                      setIdProvince(newValue)
                      setProvineErr('')
                    }}
                    name={'Tỉnh/Thành phố'}
                    error={provinceErr ? true : false}
                    helperText={provinceErr}
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
                    setId={(newValue) => {
                      setIdDistrict(newValue)
                      setDistrictErr('')
                    }}
                    error={districtErr ? true : false}
                    helperText={districtErr}
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
                    setId={(newValue) => {
                      setIdWard(newValue)
                      setWardErr('')
                    }}
                    error={wardErr ? true : false}
                    helperText={wardErr}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Input
                    label='Số nhà'
                    value={houseNo}
                    onChange={(e) => {
                      setHouseNo(e.target.value)
                      setHouseErr('')
                    }}
                    error={houseNoErr ? true : false}
                    helperText={houseNoErr}
                  ></Input>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Input
                    label='Tên đường'
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value)
                      setStreetErr('')
                    }}
                    error={streetErr ? true : false}
                    helperText={streetErr}
                  ></Input>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Button variant='outlined' onClick={createNewHouse}>
            {idHouse ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </Box>
      </Modal>

      <Popup open={openPopup} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
    </Box>
  )
}

export default HomeProfiles
