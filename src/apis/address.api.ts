import http from '../utils/http'
// const httpAddress = axios.create({
//   baseURL: `https://vn-public-apis.fpo.vn/`,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// httpAddress.interceptors.response.use(
//   (config) => {
//     return config.data.data
//   },
//   (error) => {
//     return Promise.resolve(error)
//   }
// )

export const getAllProvine = () => {
  return http.get('api/address/province')
}

export const getDistrictByProvince = (provinceCode: string) => {
  return http.get(`api/address/district?provinceCode=${provinceCode}`)
}

export const getWardsByDistrict = (districtCode: string) => {
  return http.get(`api/address/ward?districtCode=${districtCode}`)
}
