/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { forgetPassword, resetPassword } from './forgetPasswordThunk'

interface sittingTypes {
  status: boolean
}

const initialState: sittingTypes = {
  status: false,
}
const forgetpassword = createSlice({
  name: 'forgetpassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgetPassword.pending, (state) => {
      state.status = true
    })
    builder.addCase(forgetPassword.fulfilled, (state, { payload }) => {
      state.status = false
      window.localStorage.setItem('resetPasswordMessage', payload?.data?.message)
      message.success('successfully sent')
    })
    builder.addCase(forgetPassword.rejected, (state, { payload }: any) => {
      state.status = false
      message.error(payload)
    })
    builder.addCase(resetPassword.pending, (state) => {
      state.status = true
    })
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      message.success(payload?.data?.message)
      state.status = true
    })
    builder.addCase(resetPassword.rejected, (state, { payload }: any) => {
      state.status = false
      message.error(payload)
    })
  },
})

export const {} = forgetpassword.actions

export default forgetpassword.reducer
