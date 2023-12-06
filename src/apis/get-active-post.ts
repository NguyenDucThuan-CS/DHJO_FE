import http from '../utils/http'
const url = 'api/post/active-posts'
import { PAGE_SIZE } from '../utils/constants'
export const getActivePosts = (pageNo:number = 0, pageSize:number = PAGE_SIZE) => {
  return http.get(url, {
    params: {
      pageNo: pageNo,
      pageSize: pageSize,
      sortBy: 'created_at',
      sortDir: 'desc'
    }
  })
}

export const filterActivePosts = (rest:any) => {
  return http.get(url, {
    params: {
      pageNo: 0,
      pageSize: PAGE_SIZE,
      sortBy: 'created_at',
      sortDir: 'desc',
      ...rest
    }
  })
}

