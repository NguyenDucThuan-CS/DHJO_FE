import ListHomeCard from './ListHomeCard/ListHomeCard'
import { Box, Button } from '@mui/material'
import { Modal } from '../../../components/Modal/Modal'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Input } from '../../../components/Input/Input'
import SelectDropdown from '../../../components/SelectDropdown/SelectDown'
import { getAllProvine, getDistrictByProvince, getWardsByDistrict } from '../../../apis/address.api'
import { getHouseType } from '../../../apis/utils.api'
import Loading from '../../../components/Loading/Loading'
interface Province {
  _id: string
  name: string
  slug: string
  type: string
  name_with_type: string
  code: string
  isDeleted: boolean
}
interface Ward extends Province {
  path_with_type: string
  parent_code: string
}

const HomeProfiles = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [listProvince, setListProvince] = useState<Province[]>([])
  const [idProvince, setIdProvince] = useState<string>('0')
  const [houseTypes, setHouseTypes] = useState<{ id: string; name: string }[]>([])
  const [idHouseType, setIdHouseType] = useState<string>('0')

  const [listWard, setListWard] = useState<Ward[]>([])
  const [idWard, setIdWard] = useState<string>('0')

  const [listDistrict, setListDictrict] = useState<Ward[]>([])
  const [idDistrict, setIdDistrict] = useState<string>('0')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    Promise.all([getAllProvine(), getHouseType()]).then((res) => {
      setIsLoading(false)
      setListProvince(res[0].data)
      setHouseTypes(res[1].data.data)
    })
  }, [])

  useEffect(() => {
    if (idProvince !== '0') {
      setIsLoading(true)
      getDistrictByProvince(idProvince)
        .then((res) => {
          setIsLoading(false)
          setListDictrict(res.data)
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
          setListWard(res.data)
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

  const ContentModal = () => {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <SelectDropdown list={houseTypes} id={idHouseType} setId={setIdHouseType} name={'Loại nhà'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Diện tích sàn (m2)'></Input>
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
            <Input label='Số nhà'></Input>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Input label='Tên đường'></Input>
          </Grid>
        </Grid>
      </Box>
    )
  }

  const ActionsModal = () => {
    return <Button variant='outlined'>Tạo mới</Button>
  }
  return (
    <Box>
      <Button variant='outlined' sx={{ mb: '15px' }} onClick={() => setOpen(true)}>
        Thêm mới +
      </Button>
      <ListHomeCard />
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        Content={<ContentModal></ContentModal>}
        Actions={<ActionsModal></ActionsModal>}
      />

      <Modal open={isLoading} Content={<Loading></Loading>} />
    </Box>
  )
}

export default HomeProfiles
