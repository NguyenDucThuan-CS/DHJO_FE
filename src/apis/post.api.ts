import http from '../utils/http'

const url = 'api/post'

export interface Post {
  id?: null | string
  createdAt?: null | number
  modifiedAt?: null | number
  deleted?: null
  title?: string
  content?: string
  startTime?:
    | {
        hour: number
        minute: number
        second: number
        nano: number
      }
    | [number, number]
  startDate?: string | [number, number, number]
  workTime?: number
  fee?: number
  preferredGender?: {
    id: string
    name: string
  }
  preferredEducation?: {
    id: string
    name: string
  }
  finished?: boolean
  owner?: null | {
    id: string
    username: string
    email: string
    password: string
  }
  house?: {
    id: string
    houseName: string
    houseType: {
      id: string
      name: string
    }
    floorArea: number
    houseNo: string
    street: string
    ward: {
      code: string
      name: string
      type: string
    }
    district: {
      code: string
      name: string
      type: string
    }
    province: {
      code: string
      name: string
      type: string
      slug: string
    }
  }
  helper?: null
  skills?: { id: string; skillName: string }[]
  recurringPattern?: {
    endDate: string
    period: {
      id: string
      name: string
    } | null
  }
}

export const createPost = (post: Post) => {
  return http.post(url, { ...post })
}
