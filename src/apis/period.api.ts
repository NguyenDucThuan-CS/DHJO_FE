import http from '../utils/http'

const url = 'api/period'

export const getPeriod = () => {
  return http.get(url)
}
