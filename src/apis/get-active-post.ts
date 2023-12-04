import http from '../utils/http'
const url = 'api/post/active-posts'

export const getActivePosts = (pageNo:number = 0, pageSize:number = 5) => {
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
      pageSize: 5,
      sortBy: 'created_at',
      sortDir: 'desc',
      ...rest
    }
  })
}

