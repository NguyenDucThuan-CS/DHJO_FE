import http from '../utils/http'

const url = 'api/task'

export const getAllTask = () => {
  return http.get(url)
}

export const getTaskToday = () => {
  return http.get(`${url}/today`)
}
