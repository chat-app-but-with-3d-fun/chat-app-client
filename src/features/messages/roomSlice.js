import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  messages: [],
  users: []
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: {}
})

export const {  } = roomSlice.actions

export default roomSlice.reducer