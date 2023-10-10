import http from '../utils/http'

interface updateProfileHelperParam {
  name: string
  phoneNum: string
  identificationNum: string
  birthday: string
  gender?: {
    id: string
    name: string
  }
  education?: {
    id: string
    name: string
  }
  intro: string
  skills: {
    id: string
    skillName: string
  }[]
}

const url = 'api/profile/helper'

export const getProfileHelper = () => http.get(url)
export const updateProfileHelper = (obj: updateProfileHelperParam) => http.post(url, obj)
