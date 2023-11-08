import http from '../utils/http'
const url = 'api/post/active-posts'

export const getActivePosts = () => {
  return http.get(url, {
    params: {
      pageNo: 0,
      pageSize: 20,
      sortBy: 'created_at',
      sortDir: 'desc'
    }
  })
}

export const filterActivePosts = (rest:any) => {
  return http.get(url, {
    params: {
      pageNo: 0,
      pageSize: 20,
      sortBy: 'created_at',
      sortDir: 'desc',
      ...rest
    }
  })
}

