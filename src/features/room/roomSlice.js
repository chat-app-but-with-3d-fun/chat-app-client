import { createSlice } from "@reduxjs/toolkit";
import { socket } from '../api/apiSlice'

const initialState = {
  roomId: '',
}

export const roomSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoom: (state, { payload }) => {
      console.log('setting room... with id =>', payload)
      state.roomId = payload
      if (socket) socket?.emit('setRoom', { room: payload })
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
} = roomSlice.actions

export default roomSlice.reducer