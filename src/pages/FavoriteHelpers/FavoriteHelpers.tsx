import { getFavoriteHelpers } from '../../apis/favaritehelper.api'
import { useEffect, useState } from 'react'
import ListHelperCard from './ListHelperCard/ListHelperCard'
import Box from '@mui/material/Box'
import Nofind from '../../components/NoFind/NoFind'
import { ModalLoading } from '../../components/Modal/ModalLoading'
import Loading from '../../components/Loading/Loading'

const FavorateHelpers = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    getFavoriteHelpers().then((res) => {
      setIsLoading(false);
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
     {!isLoading? <>{renderListHelper()}</> :<Loading />}
    </Box>
  )
}
export default FavorateHelpers
