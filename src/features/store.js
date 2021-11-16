import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import roomReducer from './room/roomSlice'
import { apiSlice } from './api/apiSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
  devTools: true
})