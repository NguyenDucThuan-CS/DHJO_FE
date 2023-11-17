import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  post: {
    id: null,
    createdAt: null,
    modifiedAt: null,
    deleted: null,
    title: '',
    content: '',
    startTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0
    },
    startDate: '',
    workTime: 0,
    fee: 0,
    preferredGender: {
      id: '',
      name: ''
    },
    preferredEducation: {
      id: '',
      name: ''
    },
    postStatus: null,
    owner: null,
    house: {
      id: '',
      houseName: '',
      houseType: {
        id: '',
        name: ''
      },
      floorArea: 0,
      houseNo: '',
      street: '',
      ward: {
        code: '',
        name: '',
        type: ''
      },
      district: {
        code: '',
        name: '',
        type: ''
      },
      province: {
        code: '',
        name: '',
        type: '',
        slug: ''
      }
    },
    helper: null,
    skills: [] as { id: string; skillName: string }[],
    recurringPattern: {
      endDate: '',
      period: {
        id: '',
        name: ''
      }
    }
  }
}

const slice = createSlice({
  name: 'user@',
  initialState: initialState,
  reducers: {
    doUpdateInfoStep1(state, action) {
      state.post.house = action.payload.house
    },
    doUpdateInfoStep2(state, action) {
      state.post.skills = action.payload.skills
      state.post.preferredEducation = action.payload.preferredEducation
      state.post.preferredGender = action.payload.preferredGender
      state.post.title = action.payload.title
      state.post.content = action.payload.content
      state.post.startDate = action.payload.startDate
      state.post.startTime = action.payload.startTime
      state.post.fee = action.payload.fee
      state.post.recurringPattern = action.payload.recurringPattern
      state.post.workTime = action.payload.workTime
    },
    doUpdateInfo(state, action) {
      state.post = action.payload
    }
  }
})
const { reducer: storeInfoReducer, actions } = slice

export const { doUpdateInfoStep1, doUpdateInfoStep2, doUpdateInfo } = actions
export default storeInfoReducer
