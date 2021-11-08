import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from "socket.io-client";

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
    //Get Connection
    getConnection: builder.query({
      query: () => `/`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const socket = new io('http//localhost:5000')
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            console.log(event)
            // if (!isMessage(data) || data.channel !== arg) return

            // updateCachedData((draft) => {
            //   draft.push(data)
            // })
          }

          socket.on('register', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket.close()
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
  useAuthenticateUserMutation,
  useLogoutUserQuery,
  useGetConnectionQuery
} = apiSlice