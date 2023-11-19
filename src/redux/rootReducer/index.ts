import { combineReducers } from '@reduxjs/toolkit'
import storeInfoReducer from '../slice'
import modalHelperReducer from '../slice/modalDetai'
import notiReducer from '../slice/notification'


export const rootReducer = combineReducers({
  storeInfoReducer,
  modalHelperReducer,
  notiReducer
})
