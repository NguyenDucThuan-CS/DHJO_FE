import { Grid } from '@mui/material'
import SelectDropdown from '../../components/SelectDropdown/SelectDown'
import { Input } from '../../components/Input/Input'
import Loading from '../../components/Loading/Loading'
import { useState, useEffect } from 'react'
import { getAllProvine, getDistrictByProvince, getWardsByDistrict } from '../../apis/address.api'
import { Modal } from '../../components/Modal/Modal'
import Button from '@mui/material/Button/Button'
import { createAddressHelper, getAddressHelper } from '../../apis/helperaddress.api'
import { Popup } from '../../components/Popup/Popup'
import Container from '@mui/material/Container'
import EditIcon from '@mui/icons-material/Edit'
//import { AddBox } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'

interface Province {
  code: string
  name: string
  slug: string
  type: string
}
type Ward = Omit<Province, 'slug'>

const AddAdress = () => {
  const [listProvince, setListProvince] = useState<Province[]>([])
  const [idProvince, setIdProvince] = useState<string>('0')
  const [isLoading, setIsLoading] = useState(true)
  const [listWard, setListWard] = useState<Ward[]>([])
  const [idWard, setIdWard] = useState<string>('0')

  const [listDistrict, setListDictrict] = useState<Ward[]>([])
  const [idDistrict, setIdDistrict] = useState<string>('0')
  const [houseNo, setHouseNo] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const [disabled, setDisabled] = useState<boolean>(true)
  const [text, setText] = useState<string>('')
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  
  const [provinceErr,setProvinceErr] = useState<string>('')
  const [districtErr,setDistrictErr] = useState<string>('')
  const [wardErr,setWardErr] = useState<string>('')
  const [numHouseErr,setNumHouseErr] = useState<string>('')
  const [streetErr,setStreetErr] = useState<string>('')


 const validate = () => {
    let isValid = true;
    if(idProvince == '0') {
      isValid = false
      setProvinceErr('Vui lòng chọn tỉnh')
    }

    if(idDistrict == '0') {
      isValid = false
      setDistrictErr('Vui lòng chọn huyện')
    }

    if(idWard == '0') {
      isValid = false
      setWardErr('Vui lòng chọn phường/xã')
    }

    if(!houseNo) {
      isValid = false
      setNumHouseErr('Vui lòng nhập số nhà')
    }

     if(!street) {
      isValid = false
      setStreetErr('Vui lòng nhập tên đường')
    }

    return isValid

 }

  useEffect(() => {
    setIsLoading(true)
    getAllProvine().then((res) => {
      setIsLoading(false)
      setListProvince(res.data.data)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    getAddressHelper().then((res) => {
      setIdProvince(res.data.data.province.code)
      setIdDistrict(res.data.data.district.code)
      setIdWard(res.data.data.ward.code)
      setHouseNo(res.data.data.houseNo)
      setStreet(res.data.data.street)
    })
  }, [])
  const agree = () => {
    setOpenPopup(false)
  }

  const disagree = () => {
    setOpenPopup(false)
  }

  const close = () => {
    setOpenPopup(false)
  }
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

  const createAddress = () => {
    if(validate()) {
      setIsLoading(true)
      createAddressHelper({
        houseNo: houseNo,
        street: street,
        ward: listWard.find((item) => item.code === idWard),
        district: listDistrict.find((item) => item.code === idDistrict),
        province: listProvince.find((item) => item.code === idProvince)
      })
        .then(() => {
          setIsLoading(false)
          toast.success('Cập nhật thông tin thành công')
        })
        .catch((err) => {
          setIsLoading(false)
          toast.error('Cập nhật thông tin thất bại')
        })  
    }
   
  }

  return (
    <Container sx={{ width: { xs: '100%', md: '50%', background: 'white', position: 'relative', padding: '20px' } }}>
      {/* <Button variant='outlined' onClick={() => setDisabled(false)}>
        Chinh sua
      </Button> */}
      <Grid container spacing={2}>
        <span
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => {
            setDisabled(false)
          }}
        >
          <EditIcon />
        </span>
        <Grid item xs={12} sm={6} md={4}>
          <SelectDropdown
            list={listProvince?.map((item) => ({
              id: item.code,
              name: item.name
            }))}
            id={idProvince}
            setId={(newValue) => {
              setIdProvince(newValue)
            }}
            name={'Tỉnh/Thành phố'}
            disabled={disabled}
            error = {provinceErr ? true : false}
            helperText = {provinceErr}
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
            }}
            disabled={disabled}
            error = {districtErr ? true : false}
            helperText = {districtErr}
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
            }}
            disabled={disabled}
            error = {wardErr ? true : false}
            helperText = {wardErr}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            label='Số nhà'
            value={houseNo}
            onChange={(e) => {
              setHouseNo(e.target.value)
              setNumHouseErr('')
            }}
            disabled={disabled}
            error = { numHouseErr? true : false}
            helperText = {numHouseErr}
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
            disabled={disabled}
            error = { streetErr? true : false}
            helperText = {streetErr}
          ></Input>
        </Grid>

        <Modal open={isLoading} Content={<Loading></Loading>} />
        <Popup open={openPopup} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      </Grid>
      {!disabled && (
        <Box sx = {{display: 'flex'}}>
          <Button type='submit' variant='outlined' onClick={createAddress} sx={{ margin: 'auto' }}>
            Cập nhật
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default AddAdress
