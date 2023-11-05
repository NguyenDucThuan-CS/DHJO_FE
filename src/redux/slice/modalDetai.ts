import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  helperInfo: {
    doB: '',
    gender: '',
    edu: '',
    skill: [],
    phone: '',
    name: '',
    overallRating: {
      avgScore: -1,
      typicalRatings: []
    }
  }
}

const slice = createSlice({
  name: 'modalDetailHelper@',
  initialState: initialState,
  reducers: {
    doOpenModal(state, action) {
      console.log('123')
      state.open = true
    },
    doCloseModal(state, action) {
      state.open = false
    },
    doUpdateHelperInfo(state, action) {
      console.log('action.payload', action.payload)
      state.helperInfo = action.payload
    },
    doClearHelperInfo(state) {
      state.helperInfo = {
        doB: '',
        gender: '',
        edu: '',
        skill: [],
        phone: '',
        name: '',
        overallRating: {
          avgScore: -1,
          typicalRatings: []
        }
      }
    }
  }
})
const { reducer: modalHelperReducer, actions } = slice

export const { doOpenModal, doCloseModal, doUpdateHelperInfo, doClearHelperInfo } = actions
export default modalHelperReducer
