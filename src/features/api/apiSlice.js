import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/'}),
  endpoints: builder => ({
    // messages
    // user account
    signupUser: builder.mutation({
      query: userData => ({
        url: 'user/signup',
        method: 'POST',
        body: userData
      })
    }),
    loginUser: builder.mutation({
      query: userData => ({
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
    })
  })
})

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useAuthenticateUserMutation,
  useLogoutUserQuery
} = apiSlice