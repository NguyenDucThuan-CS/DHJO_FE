import http from '../utils/http'
const url = 'api/skill'

export const getAllSkills = () => {
  return http.get(url)
}
