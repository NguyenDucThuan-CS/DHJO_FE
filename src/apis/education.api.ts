import http from '../utils/http'

const url = 'api/edu'

export const getEduLevel = () => {
  return http.get(url)
}
