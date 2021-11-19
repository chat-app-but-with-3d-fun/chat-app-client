import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  roomId: '',
}

export const roomSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoom: (state, { payload }) => {
      console.log('setting room... payload =>', payload)
      for (let key in payload) {
        state[key] = payload[key]
      }
    },
    // setMessages: (state, action) => {
    //   console.log('action', action)
    //   state.messages = action.payload
    // },
    // addMessage: (state, { payload }) => {
    //   state.messages.push(payload)
    // },
  },
  extraReducers: {}
})

// export const selectMessages = state => state.room.messages
export const selectRoomId = state => state.room.roomId
export const selectRoomName = state => state.room.name

export const {
  setRoom,
  sendMessage,
  addMessage,
  setMessages
} = roomSlice.actions

export default roomSlice.reducer