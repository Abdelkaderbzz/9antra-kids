import { message } from 'antd'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCSVData } from './csvFileThunk'
import { StatusSlicesType } from '@src/types/slicesTypes'

const initialState: StatusSlicesType & { csvData: any } = {
  status: 'idle',
  error: null,
  csvData: [],
}

const csvFileSlice = createSlice({
  name: 'csvFile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCSVData.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(getCSVData.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'succeeded'
      state.csvData = action.payload.data
    })
    builder.addCase(getCSVData.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload
      state.status = 'failed'
      message.error(state.error)
    })
  },
})

export default csvFileSlice.reducer
