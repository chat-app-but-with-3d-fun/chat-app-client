import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import socketIOClient from 'socket.io-client'
import { userSlice } from '../user/userSlice'
import { roomSlice, updateActiveList } from '../room/roomSlice'
import { notificationSlice } from '../notifications/notificationSlice'

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

          socket.on('statusMsg', (payload) => {
            console.log('STATUS MESSAGE RECEIVED!', payload)
            if (payload.type === 'inviteToRoom'){
              dispatch(
                userSlice.actions.updateRoomStatus(payload.updateRoom)
              )
              socket.emit('changeStatus', '')
            }
          })

          socket.on('joinRoom', (payload) => {
            console.log('USER joined ROOM: ', payload)
            dispatch(
              roomSlice.actions.userJoinRoom(payload)
            )
          })
          socket.on('leftRoom', (payload) =>{
            console.log('USER left ROOM: ', payload)
            dispatch(
              roomSlice.actions.userLeftRoom(payload)
            )
          })
          
          socket.on('updateActiveList', (payload) => {
            console.log('YOU received an updated list of active users', payload)
            dispatch(
              roomSlice.actions.updateActiveList(payload)
            )
          })


          socket.on('notification', (message) => {
            dispatch(
              notificationSlice.actions.setNotification(message))
            dispatch(
              userSlice.actions.incrMessages({room: message.room}))
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
      async onQueryStarted(userData, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: userData } = await queryFulfilled
          socket = new socketIOClient('https://mysterious-basin-77886.herokuapp.com/', {query: `userId=${userData._id}`})
          console.log(`new connection with userId => `, userData)
          
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
            dispatch(
              roomSlice.actions.userLoggedOut({user:friendId})
            )
          })


          socket.on('statusMsg', (payload) => {
            console.log('STATUS MESSAGE RECEIVED!', payload)
            if (payload.type === 'inviteToRoom'){
              console.log('The update should happen now', payload.updateRoom)
              dispatch(
                userSlice.actions.updateRoomStatus(payload.updateRoom)
              )
              socket.emit('changeStatus', '')
              }
          })

          socket.on('joinRoom', (payload) => {
            console.log('USER joined ROOM: ', payload)
            dispatch(
              roomSlice.actions.userJoinRoom(payload)
            )
          })
          socket.on('leftRoom', (payload) =>{
            console.log('USER left ROOM: ', payload)
            dispatch(
              roomSlice.actions.userLeftRoom(payload)
            )
          }) 


          socket.on('updateActiveList', (payload) => {
            console.log('YOU received an updated list of active users')
            dispatch(
              roomSlice.actions.updateActiveList(payload)
            )
          })


          socket.on('notification', (message) => {
            dispatch(
              notificationSlice.actions.setNotification(message))
            dispatch(
              userSlice.actions.incrMessages({room: message.room}))
          })

          dispatch(
            userSlice.actions.setUser(userData)
          )
  
        } catch (error) {
          console.log('[ERROR]', error)
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'user/logout',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            apiSlice.util.resetApiState()
          )
          dispatch(
            userSlice.actions.userLogout()
          )
          socket.disconnect()
        } catch (error) {
          console.log('[ERROR] trying to logout..', error)
        }
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
    inviteFriendToRoom: builder.mutation({
      query: ({friendId, roomId}) => ({
        url: `room/${roomId}/adduser/${friendId}`,
        method: 'POST'
      }),
      async onQueryStarted({userId}, {dispatch, queryFulfilled}){
        try{
          const {data : newRoomUser} = await queryFulfilled
            const {username, _id, updateRoom} = newRoomUser
            console.log('INVITE FRIEND RETURNS FROM BACKEND', newRoomUser)
            dispatch(
              roomSlice.actions.addUser({username, _id})
            )
          socket.emit('changeStatus', {
            "type": "inviteToRoom",
            "friend": _id,
            updateRoom
          })
        } catch(error) {
          console.log('[ERROR]', error)
        }
      }
    }),
    getRoomInfo: builder.mutation({
      query: ({id}) => ({
        url: `room/getroom`,
        method: 'POST',
        body: {id}
      }),
      async onQueryStarted({userId}, { dispatch, queryFulfilled }) {
        try {
          const { data: newRoom } = await queryFulfilled
          const tmpObj = {
            roomId: newRoom._id,
            roomUsers: newRoom.users,
            roomName: newRoom.roomName,
            roomPrivate: newRoom.private,
            activeUsers:  []
          }
          dispatch(
            roomSlice.actions.setRoom(tmpObj)
          )
        } catch (error) {
          console.log('[ERROR in getting RoOM INFO]', error)
        }
      },
    }),
    // messages
    getMessages: builder.query({
      query: (roomId) => `msg/${roomId}`,
      async onCacheEntryAdded(
        getMessages,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState, dispatch }
      ) {
        await cacheDataLoaded
        const messageReceive = (message) => {
          try {
            if (message) updateCachedData(
              (draft) => {
                const roomId = getState().room.roomId
                if (roomId === message.room) {
                  draft.messages.push(message)
                }
              }
            )
          } catch (error) {
            console.log('[ERROR]', error)
          }
        }
        socket.on('newMsg', messageReceive)
        // await cacheEntryRemoved
      },
    }),
  })
})

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useAuthUserMutation,
  useLogoutUserMutation,
  useFindUserMutation,
  useAddFriendMutation,
  useInviteFriendToRoomMutation,
  useCreateRoomMutation,
  useGetRoomInfoMutation,
  useGetMessagesQuery,
} = apiSlice