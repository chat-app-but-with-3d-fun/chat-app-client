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

export const { setUser, userLogout } = userSlice.actions

export default userSlice.reducer