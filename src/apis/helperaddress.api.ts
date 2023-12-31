import http from '../utils/http'

interface Props {
  houseNo: string
  street: string
  ward?: {
    code: string
    name: string
    type: string
  }
  district?: {
    code: string
    name: string
    type: string
  }
  province?: {
    code: string
    name: string
    type: string
    slug: string
  }
}

const url = 'api/address/helper'

export const createAddressHelper = (obj: Props) => {
  return http.post(url, obj)
}

export const getAddressHelper = () => {
  return http.get(url)
}
