import { createSlice } from "@reduxjs/toolkit";
import { socket } from '../api/apiSlice'

const initialState = {
  roomId: '',
  roomUsers: [],
  roomName: '',
  roomPrivate: null, 
  activeUsers: []
}

export const roomSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoom: (state, { payload }) => {
      const oldRoom = state.roomId
      console.log('setting room... with following Stuff =>', payload)
      for (let key in payload) {
        state[key] = payload[key]}
      if (socket) {
        socket?.emit('setRoom', { 
          newRoom: `${payload.roomId ? payload.roomId : null}`,
          oldRoom
        })
      } 
    },
    addUser: (state, {payload}) => {
      console.log('addUser in Room with... with id =>', payload)
      state.roomUsers.push(payload)   
    },
    userJoinRoom:  (state, {payload}) => {
      console.log('ROOM SLICE USER JOIN: ', payload, state.roomId)
      if (state.roomId === payload.room){
        console.log('THE IF WORKS')
        socket?.emit('sendListActiveUsers', {
          user: payload.user,
          roomId: state.roomId, 
          activeUsers: state.activeUsers})
        state.activeUsers.push(payload.user)
      }
      console.log('User: ', payload.user, ' joined ROOM: ', payload.room) 
    },

    updateActiveList: (state, {payload}) => {
      console.log('The list of active users get updated ', payload, state.activeUsers)
      if (state.roomId === payload.roomId){
        state.activeUsers = state.activeUsers.concat(payload.activeUsers)
      }
      console.log('ACTIVE USERS UPDATED: ', state.activeUsers ) 
    },

    userLeftRoom:  (state, {payload}) => {
      if (state.roomId === payload.room){
        const tmpUserArray = state.activeUsers.filter((element) => {
          return element != payload.user
        })
        state.activeUsers = Array.from(tmpUserArray)

      }
      console.log('User: ', payload.user, ' not anymore in ROOM: ', payload.room) 
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
export const selectRoomId     = state => state.room.roomId
export const selectRoomName   = state => state.room.roomName
export const selectRoomUsers  = state => state.room.roomUsers
export const selectActiveUsers = state => state.room.activeUsers
export const selectRoom       = state => state.room

export const {
  setRoom, addUser, userLeftRoom, userJoinRoom, updateActiveList 
} = roomSlice.actions

export default roomSlice.reducer