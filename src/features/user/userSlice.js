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
    userLogout: (state, action) => {
      return initialState
    }
  }
})

export const selectUserId = state => state.user.userId

export const { setUser, userLogout } = userSlice.actions

export default userSlice.reducer