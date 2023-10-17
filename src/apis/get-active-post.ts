import http from '../utils/http'
const url = 'api/post/active-posts'

export const getActivePosts = () => {
  return http.get(url)
}
