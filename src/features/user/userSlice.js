import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: '',
  socketId: '',
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


export const { setUser, userLogout } = userSlice.actions

export default userSlice.reducer