import { getFavoriteHelpers } from '../../apis/favaritehelper.api'
import { useEffect, useState } from 'react'
import ListHelperCard from './ListHelperCard/ListHelperCard'
import HelperCard from './HelperCard/HelperCard'

const FavorateHelpers = () => {
  useEffect(() => {
    getFavoriteHelpers().then((res) => {
      console.log('res', res)
      setFavoriteHelpers(res.data.data)
    })
  }, [])
 //console.log("lissss", favoriteHelpers)
  const [favoriteHelpers, setFavoriteHelpers] = useState([])
 console.log("lissss", favoriteHelpers)

  const renderListHelper = () => {
    if (favoriteHelpers.length) {
      return <ListHelperCard listHelpers = {favoriteHelpers} />
    }
    return 'Chưa có người giúp việc yêu thích'
  }
  return <div>{renderListHelper()}</div>
}
export default FavorateHelpers
