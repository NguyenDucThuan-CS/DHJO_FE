import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  numNoti: 0,
  open: false,
  
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
    },
    doUpdateNumNoti(state, action) {
        state.numNoti = action.payload
    },
    doOpenNoti(state, action) {
      state.open = true
    },
    doCloseNoti(state, action) {
      state.open = false
    } 
   
  }
})
const { reducer: notiReducer, actions } = slice

export const { doIncreaseNotiNum, doClearNotiNum, doUpdateNumNoti, doOpenNoti, doCloseNoti } = actions
export default notiReducer
