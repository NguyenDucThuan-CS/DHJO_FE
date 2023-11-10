import { getFavoriteHelpers } from '../../apis/favaritehelper.api'
import { useEffect, useState } from 'react'
import ListHelperCard from './ListHelperCard/ListHelperCard'

const FavorateHelpers = () => {
  useEffect(() => {
    getFavoriteHelpers().then((res) => {
      setFavoriteHelpers(res.data.data)
    })
  }, [])
 
  const [favoriteHelpers, setFavoriteHelpers] = useState([])

  const renderListHelper = () => {
    if (favoriteHelpers.length) {
      return <ListHelperCard listHelpers = {favoriteHelpers} />
    }
    return 'Chưa có người giúp việc yêu thích'
  }
  return <div>{renderListHelper()}</div>
}
export default FavorateHelpers
