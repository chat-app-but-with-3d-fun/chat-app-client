import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  username: '',
  email: '',
  avatar: '',
  friends: [],
  rooms: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log('INITIAL USER SET: ', payload)
      for (let key in payload) {
        key === '_id'
        ? state.userId = payload[key]
        : state[key] = payload[key]
      }
    },
    addFriend: (state, { payload }) => {
      state.friends.push(payload.friend)
      state.rooms.push(payload.room)
    },
    createRoom: (state, { payload }) => {
      console.log('payload...', payload)
      state.rooms.push(payload)
    },
    updateFriendStatus: (state, { payload }) => {
      console.log('payload...', payload)
      const index = state.friends.findIndex(
        item => item._id === payload
      )
      state.friends[index].online = !state.friends[index].online
    },
    updateRoomStatus: (state, { payload }) => {
      console.log('UPDATE ROOM', payload)
      state.rooms.push({room: payload, unread: 0})  
    },
    userLogout: (state, action) => {
      return initialState
    }
  }
})

export const selectUserId = state => state.user.userId
export const selectUserRooms = state => state.user.rooms
export const selectUserFriends = state => state.user.friends
export const selectPrivateRooms = state => state.user.rooms.filter(el => el.room.private)
export const selectPublicRooms = state => state.user.rooms.filter(el =>  !el.room.private)
export const selectUnreadPrivate = state => state.user.rooms.filter(el => el.room.private).reduce((acc, cur) => {
  return acc + cur.unread}, 0
  )
export const selectUnreadPublic = state => state.user.rooms.filter(el => el.room.public).reduce((acc, cur) => {
    return acc + cur.unread}, 0
    )



export const {
  setUser,
  addFriend,
  createRoom,
  updateFriendStatus,
  updateRoomStatus,
  userLogout
} = userSlice.actions

export default userSlice.reducer