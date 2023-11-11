import http from '../utils/http'
const url = 'api/rating'

export const rateHelper = (postId: string,obj: { score: number; comment: string }) => {
  return http.post(url + `?postId=${postId}`, obj)
}
