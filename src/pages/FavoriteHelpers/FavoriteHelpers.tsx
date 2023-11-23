import { getFavoriteHelpers } from '../../apis/favaritehelper.api'
import { useEffect, useState } from 'react'
import ListHelperCard from './ListHelperCard/ListHelperCard'
import Box from '@mui/material/Box'
import Nofind from '../../components/NoFind/NoFind'
const FavorateHelpers = () => {
  useEffect(() => {
    getFavoriteHelpers().then((res) => {
      setFavoriteHelpers(res.data.data)
    })
  }, [])

  const [favoriteHelpers, setFavoriteHelpers] = useState([])

  const renderListHelper = () => {
    if (favoriteHelpers.length) {
      return <ListHelperCard listHelpers={favoriteHelpers} />
    }
    return <Nofind />
  }
  return (
    <Box sx={{width:'80%', margin: 'auto'}}>
    {renderListHelper()}  
    </Box>
  )
}
export default FavorateHelpers
