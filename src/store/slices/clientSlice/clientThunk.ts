import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'
export const getAllClient = createAsyncThunk(
  'admin/getAllClient',
  async (paginate: any, { rejectWithValue }) => {
    try {
      const { page, pageSize, searchValue } = paginate
      const queryParams: any = {
        page: page || 1,
        limit: pageSize || 10,
        ...(searchValue ? { email: searchValue } : {}),
      }
      // queryParams['orderBy'] = 'createdAt'
      // queryParams['order'] = 'desc'
      const response = await axiosInstance.get('/api/clients', { params: queryParams })
      if (response.status === 200) {
        return response.data
      }
      throw new Error(response.statusText)
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  },
)
