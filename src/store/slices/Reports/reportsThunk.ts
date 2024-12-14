import { RcFile } from 'antd/lib/upload/interface'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'

export type reportsPayload = {
  emailOrPhone: string | number
  description: string
  uploadedImage: RcFile | null
}

export const createReports = createAsyncThunk(
  'reports/post',
  async (reportsData: reportsPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('description', String(reportsData.description))
      formData.append('email', String(reportsData.emailOrPhone))
      if (reportsData.uploadedImage) {
        formData.append('image', reportsData.uploadedImage, reportsData.uploadedImage?.name)
      }
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      const response = await axiosInstance.post(`/api/reclamations`, formData, { headers })
      if (response.status === 201) {
        return response.data
      }
      throw new Error(response.statusText)
    } catch (error: any) {
      const payloadError =
        error?.response?.data?.errors?.description ||
        error?.response?.data?.errors?.email ||
        error?.response?.data?.errors?.image
      const message = error?.response?.data?.message || error?.response?.data
      if (payloadError) {
        return rejectWithValue(payloadError)
      } else if (message) {
        return rejectWithValue(message)
      } else {
        return rejectWithValue('Something went wrong')
      }
    }
  },
)

export const getReports = createAsyncThunk(
  'reports/get',
  async (page: number, { rejectWithValue }) => {
    const queryParams = {
      page: page,
      orderBy: 'createdAt',
      order: 'desc',
    }
    try {
      const response = await axiosInstance.get(`/api/reclamations`, { params: queryParams })
      if (response.status === 200) {
        return response.data
      }
      throw new Error(response.statusText)
    } catch (error: any) {
      return rejectWithValue('Something went wrong')
    }
  },
)
