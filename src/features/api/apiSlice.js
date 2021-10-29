import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
  endpoints: builder => ({
    // user -----------
    signupUser: builder.mutation({
      query: (userData) => ({
        url: 'user/signup',
        method: 'POST',
        body: userData
      })
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'user/login',
        method: 'POST',
        body: userData
      })
    }),
    authenticateUser: builder.mutation({
      query: () => ({
        url: 'user/auth',
        method: 'POST',
      })
    }),
    logoutUser: builder.query({
      query: () => 'user/logout'
    }),
    findFriend: builder.mutation({
      query: (userId, input) => ({
        url: `user/${userId}/findfriend`,
        method: 'POST',
        body: input
      })
    }),
    addFriend: builder.mutation({
      query: (userId, friendId) => ({
        url: `user/${userId}/addfriend`,
        method: 'POST',
        body: friendId
      })
    }),
    // room -----------
    createRoom: builder.mutation({
      query: () => ({
        url: `room/newroom`,
        method: 'POST'
      })
    }),
    inviteFriendToRoom: builder.mutation({
      query: (friendId, roomId) => ({
        url: `room/${roomId}/${friendId}`,
        method: 'POST'
      })
    }),
    // messages
    getMessages: builder.query({
      query: (roomId) => `msg/${roomId}`
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: `msg/newmsg`,
        method: 'POST',
        body: message // => { roomId: xxx, msg: text }
      })
    })
  })
})

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useAuthenticateUserMutation,
  useLogoutUserQuery
} = apiSlice