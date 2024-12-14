/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'

interface sittingTypes {
  isSideBarOpened: boolean
  isCrudFormOpened: boolean
  isTourPostsOpen: boolean
  isTourEditorOpen: boolean
}

const initialState: sittingTypes = {
  isSideBarOpened: false,
  isCrudFormOpened: false,

  isTourPostsOpen: false,
  isTourEditorOpen: false,
}
const sittingSlice = createSlice({
  name: 'sittingslice',
  initialState,
  reducers: {
    togglePostsTour: (state) => {
      state.isTourPostsOpen = !state.isTourPostsOpen
    },
    toggleEditorTour: (state) => {
      state.isTourEditorOpen = !state.isTourEditorOpen
    },
    toggleSideBar: (state) => {
      state.isSideBarOpened = !state.isSideBarOpened
    },
    toggleCrudForm: (state) => {
      state.isCrudFormOpened = !state.isCrudFormOpened
    },
  },
})

export const { togglePostsTour, toggleEditorTour, toggleSideBar, toggleCrudForm } =
  sittingSlice.actions

export default sittingSlice.reducer
