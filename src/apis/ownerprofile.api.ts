import http from '../utils/http'

interface updateProfileOwnerParam {
  id: 'string'
  name: 'string'
  phoneNum: 'string'
  identificationNum: 'string'
}
const url = 'api/profile/owner'

export const getProfileOwner = () => http.get(url)
export const updateProfileOwner = (obj: updateProfileOwnerParam) => http.post(url, obj)
