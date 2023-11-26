import http from '../utils/http'

const url = 'api/image'

export const getImg = () => http.get(url + '/user')

export const updateImg = (obj: FormData) => http.post(url, obj)

export const updateHouseImg = ({ id, base64String }: any) => {
  return http.post(
    url + '/house',
    {
      id,
      base64String
    },
    { params: { houseId: id } }
  )
}

export const updateImgUser = ({ id, base64String }: any) => {
  return http.post(
    url + '/user',
    {
      id,
      base64String
    }
  )
}
