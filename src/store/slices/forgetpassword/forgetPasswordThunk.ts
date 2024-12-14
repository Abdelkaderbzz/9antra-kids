import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '@src/utils/axios'

export const forgetPassword = createAsyncThunk(
  'auth/forget',
  async ({ email }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/forgot-password`, { email })
      return response
    } catch (error: any) {
      const validationErr = error?.response?.data?.errors?.email
      const dbErr = error?.response?.data?.message
      if (dbErr) {
        return rejectWithValue(dbErr)
      } else if (validationErr) {
        return rejectWithValue(validationErr)
      } else {
        return rejectWithValue('Something went wrong')
      }
    }
  },
)
export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (query: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/auth/reset-password`, query)
      return response
    } catch (err: any) {
      if (err?.response?.data?.message) {
        return rejectWithValue(err?.response?.data?.message)
      } else {
        return rejectWithValue('someThing wend wrong')
      }
    }
  },
)
