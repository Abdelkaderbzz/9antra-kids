/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { message } from 'antd'
import { profileState } from '../../../types/slicesTypes'
import { updateCredential, updateAvatar, updatePassword } from './profileThunk'

const initialState: profileState = {
  status: 'idle',
  error: null,
  isUpdated: false,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleUpdate: (state) => {
      state.isUpdated = !state.isUpdated
    },
    restore: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    //? updateCredential

    builder.addCase(updateCredential.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(updateCredential.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload?.message
      state.status = 'failed'
      message.error(action?.payload)
    })

    builder.addCase(updateAvatar.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(updateAvatar.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload?.message
      state.status = 'failed'
      message.error(action?.payload?.message)
    })
    //? updatePassword

    builder.addCase(updatePassword.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(updatePassword.fulfilled, (state) => {
      message.success('Your passwords updated successfully')
      state.status = 'succeeded'
    })
    builder.addCase(updatePassword.rejected, (state, action: PayloadAction<any>) => {
      state.error = action?.payload
      state.status = 'failed'
      message.error(state.error)
    })
  },
})

export const { restore, toggleUpdate } = profileSlice.actions

export default profileSlice.reducer
