import axios from 'axios'

const httpAddress = axios.create({
  baseURL: `https://vn-public-apis.fpo.vn/`,
  headers: {
    'Content-Type': 'application/json'
  }
})

httpAddress.interceptors.response.use(
  (config) => {
    return config.data.data
  },
  (error) => {
    return Promise.resolve(error)
  }
)

export const getAllProvine = () => {
  return httpAddress.get('/provinces/getAll?limit=-1')
}

export const getDistrictByProvince = (provinceCode: string) => {
  return httpAddress.get(`/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`)
}

export const getWardsByDistrict = (districtCode: string) => {
  return httpAddress.get(`/wards/getByDistrict?districtCode=${districtCode}&limit=-1`)
}
