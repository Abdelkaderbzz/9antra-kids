/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'
import {
  updateCredentialPayload,
  // updateAvatarPayload,
  updatePasswordPayload,
} from '../../../types/slicesTypes'

export const updateCredential = createAsyncThunk(
  'profile-update',
  async (query: updateCredentialPayload, thunkapi) => {
    try {
      const response = await axiosInstance.put(`/api/users/profile-update`, query)
      if (response.status === 200) {
        return response.data
      }
      throw new Error(response.statusText)
    } catch (err: any) {
      const errMsg = err?.response?.data?.errors?.email
      return thunkapi.rejectWithValue(errMsg)
    }
  },
)

export const updateAvatar = createAsyncThunk('uploadAvatar', async (query: any, thunkapi) => {
  try {
    const formData = new FormData()
    if (query) formData.append('file', query, query?.name)
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    const response = await axiosInstance.post(`/api/users/avatar-upload`, formData, { headers })
    if (response.status === 200) {
      return response.data
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return thunkapi.rejectWithValue(err)
  }
})

export const updatePassword = createAsyncThunk(
  '/profile-password-update',
  async (query: updatePasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/users/profile-password-update`, query)
      return response.data
    } catch (err: any) {
      if (err?.response?.data?.message) {
        return rejectWithValue(err?.response?.data?.message)
      } else {
        return rejectWithValue('some Thing wend wrong')
      }
    }
  },
)
