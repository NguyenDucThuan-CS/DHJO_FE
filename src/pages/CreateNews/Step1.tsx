import Box from '@mui/material/Box'
import ListHomeCard, { House } from '../Profiles/HomeProfiles/ListHomeCard/ListHomeCard'
import { getHousesOfOwer } from '../../apis/house.api'
import { useEffect, useState } from 'react'

const Step1 = ({ idChosen, setIdHouseChosen }: { idChosen: string; setIdHouseChosen: (id: string) => void }) => {
  const [listHouse, setListHouse] = useState<House[]>([])
  const choose = (id: string, flag: boolean) => {
    if (flag === true) setIdHouseChosen(id)
    else setIdHouseChosen('')
  }
  useEffect(() => {
    getHousesOfOwer().then((res) => {
      setListHouse(res.data.data)
    })
  }, [])

  return (
    <Box>
      <ListHomeCard listHouses={listHouse} choose={choose} idChosen={idChosen} />
    </Box>
  )
}

export default Step1
