import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: '',
  messages: []
}

export const roomSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoom: (state, { payload }) => {
      state.roomId = payload
    },
    setMessages: (state, action) => {
      console.log('action', action)
      state.messages = action.payload
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload)
    },
  },
  extraReducers: {}
})

export const selectMessages = state => state.room.messages
export const selectRoomId = state => state.room.roomId

export const {
  setRoom,
  sendMessage,
  addMessage,
  setMessages
} = roomSlice.actions

export default roomSlice.reducer