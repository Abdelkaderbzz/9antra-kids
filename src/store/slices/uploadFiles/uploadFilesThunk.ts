import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'

export const uploadFiles = createAsyncThunk(
  'uploadFiles/post',
  async (fileData: any, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      const formData = new FormData()
      formData.append('file', fileData)
      const response = await axiosInstance.post(`/api/upload`, formData, { headers })
      if (response.status === 201) {
        return response.data
      }
      throw new Error('Failed to upload image')
    } catch (error) {
      return rejectWithValue('Failed to upload image')
    }
  },
)
export const uploadBackgroundImage = createAsyncThunk(
  'uploadBackgroundImage/post',
  async (fileData: any, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      const formData = new FormData()
      formData.append('file', fileData)
      const response = await axiosInstance.post(`/api/upload`, formData, { headers })
      if (response.status === 201) {
        return response.data
      }
      throw new Error('Failed to upload image')
    } catch (error) {
      return rejectWithValue('Failed to upload image')
    }
  },
)
