import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  createdAt: 0,
  modifiedAt: 0,
  deleted: 0,
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
  finished: true,
  owner: {
    id: '',
    username: '',
    email: '',
    password: ''
  },
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
  helper: {
    id: '',
    username: '',
    email: '',
    password: ''
  },
  skills: [
    {
      id: '',
      skillName: ''
    }
  ],
  recurringPattern: {
    endDate: '',
    period: {
      id: '',
      name: ''
    }
  }
}

const slice = createSlice({
  name: 'user@',
  initialState: initialState,
  reducers: {
    doUpdateInfoStep1(state, action) {
      state.house = action.payload.house
    }
  }
})
const { reducer: storeInfoReducer, actions } = slice

export const { doUpdateInfoStep1 } = actions
export default storeInfoReducer
