import { createSlice } from "@reduxjs/toolkit";
import { socket } from '../api/apiSlice'

const initialState = {
  roomId: '',
  roomUsers: [],
  roomName: ''

}

export const roomSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoom: (state, { payload }) => {
      console.log('setting room... with following Stuff =>', payload)
      for (let key in payload) {
        state[key] = payload[key]
      }
      // console.log('setting room... with id =>', payload)
      // state.roomId = payload
      if (socket) {
        socket?.emit('setRoom', { room: `${payload.roomId ? payload.roomId : null}`})
      } 
    },
    addUser: (state, {payload}) => {
      console.log('addUser in Room with... with id =>', payload)
      state.roomUsers.push(payload)   
    }
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
export const selectRoomUsers = state => state.room.roomUsers

export const {
  setRoom, addUser
} = roomSlice.actions

export default roomSlice.reducer