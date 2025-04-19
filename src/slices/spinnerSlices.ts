import { createSlice } from '@reduxjs/toolkit'

type SpinnerState = {
  show: boolean
  fetchCount: number
}

const initialState: SpinnerState = {
  show: false,
  fetchCount: 0,
}

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    showSpinner: state => {
      state.show = true
      state.fetchCount += 1
      console.log('start', state)
    },
    closeSpinner: state => {
      if (state.fetchCount <= 1) {
        state.show = false
      }
      state.fetchCount -= 1
      console.log('end', state.fetchCount)
    },
  },
})

export const { showSpinner, closeSpinner } = spinnerSlice.actions

export const selectSpinnerStatus = (state: { spinner: SpinnerState }) =>
  state.spinner

export default spinnerSlice.reducer
