import http from '../utils/http'

const url = 'api/gender'

export const getGender = () => {
  return http.get(url)
}
