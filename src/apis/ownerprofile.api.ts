import http from '../utils/http'
import { objToQuery } from '../utils/api'

interface getProfileOwnerParam {
  id: string
}

interface updateProfileOwnerParam {
  id: 'string'
  name: 'string'
  phoneNum: 'string'
  identificationNum: 'string'
}
const url = 'api/profile/owner'

export const getProfileOwner = (obj: getProfileOwnerParam) => http.get(url + objToQuery(obj))
export const updateProfileOwner = (obj: updateProfileOwnerParam) => http.post(url,obj)
