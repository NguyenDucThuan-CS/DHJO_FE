import http from '../utils/http'
import { objToQuery } from '../utils/api'

interface getProfileOwnerParam {
  id: string
}
const url = 'api/profile/owner'

export const getProfileOwner = (obj: getProfileOwnerParam) => http.get(url + objToQuery(obj))
