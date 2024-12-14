import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'

export type csvFileType = {
  id: string | undefined
  exportType: 'reacts' | 'comments'
}
// export data csv file from  'reacts' | 'comments'
export const getCSVData = createAsyncThunk(
  'csvFile/get',
  async (csvFileData: csvFileType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/popups/${csvFileData.id}/download-${csvFileData.exportType}`,
      )
      if (response.status === 200) {
        return response.data
      }
      throw new Error(response.statusText)
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue('Something went wrong')
      }
    }
  },
)
