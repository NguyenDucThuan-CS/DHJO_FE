import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: ''
}

const slice = createSlice({
  name: 'token@',
  initialState: initialState,
  reducers: {
    doStoreToken(state, action) {
      state.token = action.payload
    }
  }
})
const { reducer: currentReducer, actions } = slice

export const {
    doStoreToken
} = actions
export default currentReducer
