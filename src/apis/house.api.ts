import { objToQuery } from '../utils/api'
import http from '../utils/http'
const url = 'api/house/owner'

interface UpdateHouseParam {
  id?: string | null
  houseName: string
  houseType:
    | {
        id: string
        name: string
      }
    | undefined
  floorArea: number
  houseNo: string
  street: string
  ward:
    | {
        code: string
        name: string
        type: string
      }
    | undefined
  district:
    | {
        code: string
        name: string
        type: string
      }
    | undefined
  province:
    | {
        code: string
        name: string
        type: string
        slug: string
      }
    | undefined
}

export const updateHouseOwner = (obj: UpdateHouseParam) => {
  return http.post(url, obj)
}

export const getHousesOfOwer = () => {
  return http.get(`${url}/all`)
}

export const getHouseById = (obj: { id: string }) => {
  return http.get(url + objToQuery(obj))
}

export const deleteHouseById = (obj: { houseId: string }) => {
  return http.delete(url + objToQuery(obj))
}
