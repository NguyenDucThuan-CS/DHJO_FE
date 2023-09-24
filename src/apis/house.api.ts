import http from '../utils/http'
const url = 'api/house/owner'

interface UpdateHouseParam {
  id?: string | null
  houseName: string
  houseType: {
    id?: string
    name?: string
  }
  floorArea: number
  houseNo: string
  street: string
  ward: {
    code?: string
    name?: string
    type?: string
  }
  district: {
    code?: string
    name?: string
    type?: string
  }
  province: {
    code?: string
    name?: string
    type?: string
    slug?: string
  }
}

export const updateHouseOwner = (obj: UpdateHouseParam) => {
  return http.post(url, obj)
}

export const getHousesOfOwer = () => {
  return http.get(`${url}/all`)
}
