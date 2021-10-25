import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import msgReducer from './messages/messagesSlice'
import { apiSlice } from './api/apiSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    messages: msgReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  devTools: true
})