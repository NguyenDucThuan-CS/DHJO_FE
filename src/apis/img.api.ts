import http from '../utils/http'

const url = 'api/image/user'

export const getImg = () => http.get(url)

export const updateImg = (obj: FormData) => http.post(url, obj)
