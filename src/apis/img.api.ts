import http from '../utils/http'

const url = 'api/image'

export const getImg = () => http.get(url)

export const updateImg = (obj: FormData) => http.post(url, obj)

export const updateHouseImg = ({ id, base64String }: any) => {
  return http.post(url,{
    id,
    base64String
  })
}
