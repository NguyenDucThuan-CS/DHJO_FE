import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  numNoti: 0
}

const slice = createSlice({
  name: 'noti@',
  initialState: initialState,
  reducers: {
    doIncreaseNotiNum(state, payload) {
        state.numNoti = state.numNoti + 1
    },
    doClearNotiNum(state, payload) {
        state.numNoti = 0
    }
   
  }
})
const { reducer: notiReducer, actions } = slice

export const { doIncreaseNotiNum, doClearNotiNum } = actions
export default notiReducer
