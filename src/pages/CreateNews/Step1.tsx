import Box from '@mui/material/Box'
import ListHomeCard, { House } from '../Profiles/HomeProfiles/ListHomeCard/ListHomeCard'
import { getHousesOfOwer } from '../../apis/house.api'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import React, { useImperativeHandle, useState, useEffect } from 'react'
import { doUpdateInfoStep1 } from '../../redux/slice'
import { ModalLoading } from '../../components/Modal/ModalLoading'

const Step1 = React.forwardRef(function Step1(props, ref) {
  const [listHouse, setListHouse] = useState<House[]>([])
  const [idHouseChosen, setIdHouseChosen] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch()

  const { post } = useSelector((state: RootState) => {
    return state.storeInfoReducer
  })

  const choose = (id: string, flag: boolean) => {
    if (flag === true) setIdHouseChosen(id)
    else setIdHouseChosen('')
  }
  useEffect(() => {
    setIsLoading(true)
    getHousesOfOwer().then((res) => {
      setIsLoading(false)
      setListHouse(res.data.data)
    })
  }, [])

  useEffect(() => {
    setIdHouseChosen(post.house.id)
  }, [post])

  const getHouseOject = (id: string) => {
    return listHouse.find((item) => item.id === id)
  }

  useImperativeHandle(ref, () => ({
    handlePassStep() {
      if (idHouseChosen) {
        dispatch(doUpdateInfoStep1({ house: getHouseOject(idHouseChosen) }))
        return true
      } else {
        dispatch(
          doUpdateInfoStep1({
            house: {
              id: '',
              houseName: '',
              houseType: {
                id: '',
                name: ''
              },
              floorArea: 0,
              houseNo: '',
              street: '',
              ward: {
                code: '',
                name: '',
                type: ''
              },
              district: {
                code: '',
                name: '',
                type: ''
              },
              province: {
                code: '',
                name: '',
                type: '',
                slug: ''
              }
            }
          })
        )
        return false
      }
    }
  }))
  return (
    <Box>
      <ListHomeCard listHouses={listHouse} choose={choose} idChosen={idHouseChosen} />
      <ModalLoading isLoading = {isLoading}/>
    </Box>
  )
})

export default Step1
