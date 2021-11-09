import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import  socketIOClient from "socket.io-client";

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
      })
    }),
    authUser: builder.mutation({
      query: () => ({
        url: 'user/auth',
        method: 'POST',
      })
    }),
    logoutUser: builder.query({
      query: () => 'user/logout'
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
    //Get Connection
    getConnection: builder.query({
      query: (nr) => `user/test`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        console.log('new connection')
        const socket = new socketIOClient('http://127.0.0.1:5000', {query: "userId=6183ad4539b3ca649db76100"})
        console.log('SOCKET: ', socket)
        try {
          await cacheDataLoaded
          console.log('CAHCE: ',cacheDataLoaded)
          const handshake = (payload) => {
            console.log('At least this shows up --> UserId', payload)
            socket.emit('handshake', payload)
          }
          const newMsg = (message) => {
            console.log('Message arrives: ', message)
            updateCachedData((draft) => {
              console.log("UPADTE: ", updateCachedData)
              console.log('DRAFT: ', draft)
              // draft.push(message)
            })
            
          }



          socket.on('register', handshake) 
          socket.on('newMsg', newMsg)
        } catch {
        }
        
      },
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
  useAuthUserMutation,
  useLogoutUserQuery,
  useGetConnectionQuery
} = apiSlice