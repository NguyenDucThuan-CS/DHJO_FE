import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 open: false,
 helperInfo: {

 }
}

const slice = createSlice({
  name: 'modalDetailHelper@',
  initialState: initialState,
  reducers: {
    doOpenModal(state, action){
        state.open = false
    },
    doCloseModal(state, action){
        state.open = false
    },
    doUpdateHelperInfo(state,action) {
        state.helperInfo = action.payload
    }
  }
})
const { reducer: modalHelperReducer, actions } = slice

export const {  } = actions
export default modalHelperReducer
