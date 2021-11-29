import { createSlice } from "@reduxjs/toolkit";
import { socket } from '../api/apiSlice'

const initialState = {
  show: false
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, { payload }) => {
      for (let key in payload) {
        state[key] = payload[key]
      }
      state.show = true
    },
    closeNotification: (state) => {
      state.show = false
    }
  }
})

export const selectNotification = state => state.notification

export const {
  setNotification,
  closeNotification
} = notificationSlice.actions

export default notificationSlice.reducer