import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import socketIOClient from 'socket.io-client'
import { userSlice } from '../user/userSlice'

export let socket;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mysterious-basin-77886.herokuapp.com/',
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
          const { data: userData } = await queryFulfilled
          socket = new socketIOClient('https://mysterious-basin-77886.herokuapp.com/', {query: `userId=${userData._id}`})
          console.log(`new connection with userId => `, userData._id)
          socket.on('register', (friendId) => {
            socket.emit('handshake', friendId)
            dispatch(
              userSlice.actions.updateFriendStatus(friendId)
            )
          })
          socket.on('unRegister', (friendId) => {
            dispatch(
              userSlice.actions.updateFriendStatus(friendId)
            )
          })
          dispatch(
            userSlice.actions.setUser(userData)
          )
        } catch (error) {
          console.log('[ERROR]', error)
        }
      }
    }),
    authUser: builder.mutation({
      query: () => ({
        url: 'user/auth',
        method: 'POST',
      }),
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        try {
          const { data: userData } = await queryFulfilled
          socket = new socketIOClient('https://mysterious-basin-77886.herokuapp.com/', {query: `userId=${userData._id}`})
          console.log(`new connection with userId => `, userData._id)
          socket.on('register', (friendId) => {
            socket.emit('handshake', friendId)
            dispatch(
              userSlice.actions.updateFriendStatus(friendId)
            )
          })
          socket.on('unRegister', (friendId) => {
            dispatch(
              userSlice.actions.updateFriendStatus(friendId)
            )
          })
          dispatch(
            userSlice.actions.setUser(userData)
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
    findUser: builder.mutation({
      query: ({userId, input}) => ({
        url: `user/${userId}/findfriend`,
        method: 'POST',
        body: {input}
      })
    }),
    addFriend: builder.mutation({
      query: ({userId, friendId}) => ({
        url: `user/${userId}/addfriend`,
        method: 'POST',
        body: {friendId}
      }),
      async onQueryStarted({userId, friendId}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            userSlice.actions.addFriend(data)
          )
          socket.emit('changeStatus', {
            "type": "addFriend",
            "friend": friendId,
          })
        } catch (error) {
          console.log('[ERROR]', error)
        }
      },
    }),
    // room -----------
    createRoom: builder.mutation({
      query: (roomName) => ({
        url: `room/newroom`,
        method: 'POST',
        body: {roomName}
      }),
      async onQueryStarted({userId, friendId}, { dispatch, queryFulfilled }) {
        try {
          const { data: newRoom } = await queryFulfilled
          dispatch(
            userSlice.actions.createRoom(newRoom)
          )
          socket.emit('changeStatus', '')
        } catch (error) {
          console.log('[ERROR]', error)
        }
      },
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
        getMessages,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
      ) {
        await cacheDataLoaded
        const handshake = (message) => {
          try {
            if (message) updateCachedData(
              (draft) => {
                const roomId = getState().room.roomId
                console.log('getting message =>', message)
                console.log('in room ->', roomId)
                if (roomId === message.room) {
                  draft.messages.push(message)
                }
              }
            )
          } catch (error) {
            console.log('[ERROR]', error)
          }
        }
        socket.on('newMsg', handshake)
        // await cacheEntryRemoved
      },
    }),
  })
})

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useAuthUserMutation,
  useLogoutUserQuery,
  useFindUserMutation,
  useAddFriendMutation,
  useCreateRoomMutation,
  useGetMessagesQuery,
  useSendMessageMutation
} = apiSlice