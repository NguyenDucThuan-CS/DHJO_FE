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

  useEffect(() => {
    setIsLoading(true)
    getAllProvine().then((res) => {
      setIsLoading(false)
      setListProvince(res.data.data)
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
        setText('Cập nhật địa chỉ thành công')
        setOpenPopup(true)
      })
      .catch((err) => {
        console.log(err)
        setOpenPopup(true)
        setIsLoading(false)
      })
  }

  return (
    <Container sx={{ width: { xs: '100%', md: '50%' } }}>
      <Button variant='outlined' onClick={() => setDisabled(false)}>
        Chinh sua
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <SelectDropdown
            list={listProvince?.map((item) => ({
              id: item.code,
              name: item.name
            }))}
            id={idProvince}
            setId={setIdProvince}
            name={'Tỉnh/Thành phố'}
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            label='Số nhà'
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            disabled={disabled}
          ></Input>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Input
            label='Tên đường'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            disabled={disabled}
          ></Input>
        </Grid>

        <Modal open={isLoading} Content={<Loading></Loading>} />
        <Popup open={openPopup} handleAgree={agree} handleDisAgree={disagree} handleClose={close} text={text} />
      </Grid>
      {!disabled && (
        <Button type='submit' variant='outlined' onClick={createAddress} sx={{ margin: 'auto' }}>
          Cập nhật
        </Button>
      )}
    </Container>
  )
}

export default AddAdress
