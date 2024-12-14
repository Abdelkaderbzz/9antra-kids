import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createReports, getReports } from './reportsThunk'
import { message } from 'antd'
import { StatusSlicesType } from '@src/types/slicesTypes'
import { Meta } from '@src/types/pagination'
import { ReportsType } from '@src/types/reportsTypes'

type ListReportsType = {
  listReports: {
    docs: ReportsType[]
    meta: Meta
  }
}

const initialState: StatusSlicesType & ListReportsType = {
  status: 'idle',
  error: null,
  listReports: {
    docs: [],
    meta: {} as Meta,
  },
}

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // post report
    builder.addCase(createReports.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(createReports.fulfilled, (state) => {
      state.status = 'succeeded'
      message.success('Reporting created sucessfully')
    })
    builder.addCase(createReports.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload
      state.status = 'failed'
      message.error(state.error)
    })
    // get all reports
    builder.addCase(getReports.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(getReports.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'succeeded'
      state.listReports.meta = action.payload.data?.meta
      state.listReports.docs = state.listReports?.docs.concat(action.payload.data?.docs)
    })
    builder.addCase(getReports.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload
      state.status = 'failed'
      message.error(state.error)
    })
  },
})

export default reportsSlice.reducer
