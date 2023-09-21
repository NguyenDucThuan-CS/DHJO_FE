import http from '../utils/http'

export const getHouseType = () => http.get('api/house-type')

export const getGenderType = () => http.get('api/gender')

