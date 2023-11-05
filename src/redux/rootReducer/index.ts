import { combineReducers } from '@reduxjs/toolkit'
import storeInfoReducer from '../slice'
import modalHelperReducer from '../slice/modalDetai'
export const rootReducer = combineReducers({
  storeInfoReducer,
  modalHelperReducer
})
