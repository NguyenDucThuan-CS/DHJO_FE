import Box from '@mui/material/Box'
import ListHomeCard, { House } from '../Profiles/HomeProfiles/ListHomeCard/ListHomeCard'
import { getHousesOfOwer } from '../../apis/house.api'
import { useEffect, useState } from 'react'

const Step1 = () => {
  const [listHouse, setListHouse] = useState<House[]>([])

  useEffect(() => {
    getHousesOfOwer().then((res) => {
      setListHouse(res.data.data)
    })
  }, [])

  return (
    <Box>
      <ListHomeCard listHouses={listHouse} />
    </Box>
  )
}

export default Step1
