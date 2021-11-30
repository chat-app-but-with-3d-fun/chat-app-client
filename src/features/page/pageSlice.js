import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerOpen: true,
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    toggleDrawer: (state, { payload }) => {
      console.log('TOGGLE DRAWER!')
      state.drawerOpen = !state.drawerOpen
      },
    closeDrawer:  (state, { payload }) => {
        console.log('Close DRAWER!')
        state.drawerOpen = false
        },
    }
})

// export const selectMessages = state => state.room.messages
export const selectDrawer     = state => state.page.drawerOpen

export const {
  toggleDrawer, closeDrawer 
} = pageSlice.actions

export default pageSlice.reducer