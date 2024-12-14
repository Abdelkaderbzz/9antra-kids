import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'

export const getCommentsOfPopup = createAsyncThunk(
  'popup/getCommentsOfPopup',
  async ({ popupId, page, pageSize, orderBy, order }: any) => {
    try {
      const { data } = await axiosInstance.get(`/api/popups/${popupId}/comments`, {
        params: { page, pageSize, orderBy, order },
      })
      return data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw error.response.data
      } else {
        throw error
      }
    }
  },
)
export const getReactsOfPopup = createAsyncThunk(
  'popup/getReactsOfPopup',
  async ({ popupId, page, pageSize, orderBy, order, emoji }: any) => {
    try {
      const { data } = await axiosInstance.get(`/api/popups/${popupId}/reacts`, {
        params: { page, pageSize, orderBy, order, emoji },
      })
      return data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw error.response.data
      } else {
        throw error
      }
    }
  },
)
export const getReactsNumber = createAsyncThunk(
  'popup/getReactsNumber',
  async ({ popupId }: any) => {
    try {
      const { data } = await axiosInstance.get(`/api//popups/${popupId}/count-reacts`)
      return data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw error.response.data
      } else {
        throw error
      }
    }
  },
)
