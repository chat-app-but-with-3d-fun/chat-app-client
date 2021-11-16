import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import socketIOClient from 'socket.io-client'
import { userSlice } from '../user/userSlice'

let socket;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
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
      }),
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        try {
          const { data: { userId } } = await queryFulfilled
          socket = new socketIOClient('http://127.0.0.1:5000', {query: `userId=${userId}`})
          console.log(`new connection with userId => `, userId)
          // dispatch(
          //   apiSlice.util.updateQueryData('getMessages', message.roomId, (draft) => {
          //     draft.messages.push(message)
          //   })
          // )
        } catch (error) {
          console.log('[ERROR]', error)
        }
      },
    }),
    authUser: builder.mutation({
      query: () => ({
        url: 'user/auth',
        method: 'POST',
      }),
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          socket = new socketIOClient('http://127.0.0.1:5000', {query: `userId=${data._id}`})
          console.log(`new connection with id => `, data._id)
          dispatch(
            userSlice.actions.setUser(data)
          )
        } catch (error) {
          console.log('[ERROR]', error)
        }
      },
    }),
    logoutUser: builder.query({
      query: () => 'user/logout',
      async onCacheEntryAdded(
        args,
        { cacheEntryRemoved }
      ) {
        await cacheEntryRemoved
      }
    }),
    findFriend: builder.mutation({
      query: ({userId, input}) => ({
        url: `user/${userId}/findfriend`,
        method: 'POST',
        body: input
      })
    }),
    addFriend: builder.mutation({
      query: ({userId, friendId}) => ({
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
    inviteFriendToRoom: builder.query({
      query: ({friendId, roomId}) => (
        `room/${roomId}/${friendId}`
      )
    }),
    // messages
    getMessages: builder.query({
      query: (roomId) => `msg/${roomId}`,
      async onCacheEntryAdded(
        roomId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        await cacheDataLoaded
        const handshake = (message) => {
          try {
            if (message) updateCachedData(
              (draft) => {
                draft.messages.push(message)
              }
            )
          } catch (error) {
            console.log('[ERROR]', error)
          }
        }
        socket.on('newMsg', handshake)
        await cacheEntryRemoved
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
      },
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: `msg/newmsg`,
        method: 'POST',
        body: message // => { roomId: xxx, message: text, sender: userId, type: 'chat' }
      }),
      async onQueryStarted(message, { dispatch, queryFulfilled }) {
        try {
          const { data: newMsg } = await queryFulfilled
          dispatch(
            apiSlice.util.updateQueryData('getMessages', message.roomId, (draft) => {
              draft.messages.push(message)
            })
          )
        } catch (error) {
          console.log('[ERROR]', error)
        }
      },
    }),
  })
})

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useAuthUserMutation,
  useLogoutUserQuery,
  useGetMessagesQuery,
  useSendMessageMutation
} = apiSlice