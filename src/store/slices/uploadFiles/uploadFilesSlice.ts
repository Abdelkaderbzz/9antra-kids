import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd'
import { StatusSlicesType } from '@src/types/slicesTypes'
import { uploadFiles } from './uploadFilesThunk'

type UploadFilesType = {
  url: string | undefined
}

const initialState: StatusSlicesType & UploadFilesType = {
  status: 'idle',
  error: null,
  url: undefined,
}

const uploadFilesSlice = createSlice({
  name: 'uploadFiles',
  initialState,
  reducers: {
    defaultValueOfUrl: (state, _) => {
      state.url = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFiles.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(uploadFiles.fulfilled, (state, action) => {
      const directLink = action.payload.data.url
        .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
        .replace('?dl=0', '')
      state.url = directLink
      state.status = 'succeeded'
      message.success('Image uploaded sucessfully')
    })
    builder.addCase(uploadFiles.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'failed'
      state.error = action.payload
      message.error(state.error)
    })
  },
})
export const { defaultValueOfUrl } = uploadFilesSlice.actions

export default uploadFilesSlice.reducer
