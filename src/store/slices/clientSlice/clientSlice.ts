import { createSlice } from '@reduxjs/toolkit'
import { getAllClient } from './clientThunk'
import { ColumnType } from 'antd/es/table'

export interface contentSliceState {
  client: readonly object[] | undefined
  status: boolean
  length: number
  columnNotEncludedClient: string[]
  actionColumn: ColumnType<any>
  columns: ColumnType<any>[]
}

const initialState: contentSliceState = {
  client: undefined,
  status: false,
  length: 0,
  columnNotEncludedClient: [
    '_id',
    'avatar',
    'socketIds',
    'domain',
    'updatedAt',
    'orgUsers',
    'dna',
    'accessToken',
  ],
  actionColumn: {
    key: 'key',
    hidden: false,
    title: 'Action',
    dataIndex: 'action',
    align: 'center',
    width: 80,
  },
  columns: [
    { key: 'key', hidden: true, title: 'Id', dataIndex: '_id', align: 'center' },
    {
      key: 'key',
      hidden: false,
      title: 'User',
      dataIndex: 'fullName',
      align: 'center',
      width: 250,
    },
    {
      key: 'key',
      hidden: false,
      title: 'description',
      dataIndex: 'description',
      align: 'center',
      width: 300,
    },
    { key: 'key', hidden: false, title: 'status', dataIndex: 'status', align: 'center' },
  ],
}

const clientSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {
    addedToNotIcludesClient: (state, { payload }) => {
      if (!state.columnNotEncludedClient.includes(payload)) {
        state.columnNotEncludedClient.push(payload)
      }
    },
    removeFromNotIncludesClient: (state, { payload }) => {
      state.columnNotEncludedClient = state.columnNotEncludedClient.filter(
        (item) => item !== payload,
      )
    },
    toggleColumnHidden: (state, action) => {
      const index = state.columns.findIndex((column) => column.dataIndex === action.payload)
      if (index !== -1) {
        state.columns[index].hidden = !state.columns[index].hidden
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllClient.pending, (state) => {
      state.status = true
    })
    builder.addCase(getAllClient.fulfilled, (state, action) => {
      state.client = action?.payload?.data?.docs
      state.length = action?.payload?.data?.meta?.totalDocs
      state.status = false
    })
    builder.addCase(getAllClient.rejected, (state, _action) => {
      state.status = false
    })
  },
})
export const { addedToNotIcludesClient, removeFromNotIncludesClient, toggleColumnHidden } =
  clientSlice.actions
export default clientSlice.reducer
