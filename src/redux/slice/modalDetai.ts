import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  openRating: false,
  helperRatingId: '',
  postRatingId: '',
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
    },
    img: ''
  },
  
}

const slice = createSlice({
  name: 'modalDetailHelper@',
  initialState: initialState,
  reducers: {
    doOpenModal(state, action) {
      state.open = true
    },
    doCloseModal(state, action) {
      state.open = false
    },

    doOpenModalRating(state, action) {
      state.openRating = true
    },
    doCloseModalRating(state, action) {
      state.openRating = false
      state.helperRatingId = ""
    },
    doUpdateHelperRating(state, action) {
      state.helperRatingId = action.payload
    },

    doUpdatePostRating(state, action) {
      state.postRatingId = action.payload
    },

    doUpdateHelperInfo(state, action) {
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
        },
        img: ''
      }
    }
  }
})
const { reducer: modalHelperReducer, actions } = slice

export const {
  doOpenModal,
  doCloseModal,
  doUpdateHelperInfo,
  doClearHelperInfo,
  doCloseModalRating,
  doOpenModalRating,
  doUpdateHelperRating,
  doUpdatePostRating
} = actions
export default modalHelperReducer
