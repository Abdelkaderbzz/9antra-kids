import { createSlice } from '@reduxjs/toolkit'
import { getCommentsOfPopup, getReactsOfPopup, getReactsNumber } from './statisticThunk'
import { removeDuplicatesById } from '@src/utils/removeDuplicatesById'

export interface IReaction {
  _id: string
  name: string
  code: string
  participatorId: string
}

interface State {
  viewsNumber: number | null
  comments: any
  reacts: any
  nextPage: number
  hasMore: boolean
  reactsNextPage: number
  numberOfReacts: any
  reactsHasMore: boolean
  reactsCount: any
  currentPage: number
  reactsTotal: number
  status: boolean
}
const initialState: State = {
  viewsNumber: null,
  comments: [],
  reacts: [],
  nextPage: 1,
  hasMore: false,
  reactsNextPage: 1,
  reactsHasMore: false,
  reactsTotal: 0,
  currentPage: 1,
  numberOfReacts: null,
  reactsCount: null,
  status: false,
}

const statistic = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    resetInitalState: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsOfPopup.pending, (state) => {
      state.status = true
    })
    builder.addCase(getCommentsOfPopup.fulfilled, (state, { payload }: any) => {
      payload?.data?.docs?.map((el: any) => state.comments?.push(el))
      state.hasMore = payload?.data?.meta?.hasMore
      state.nextPage = payload?.data?.meta?.nextPage
      state.comments = removeDuplicatesById(state.comments)
      state.status = false
    })
    builder.addCase(getCommentsOfPopup.rejected, (state) => {
      state.status = false
    })
    builder.addCase(getReactsOfPopup.pending, (state) => {
      state.status = true
    })
    builder.addCase(getReactsOfPopup.fulfilled, (state, { payload }: any) => {
      state.reactsCount = payload
      payload?.data?.docs?.map((el: any) => state.reacts?.push(el))
      state.reactsHasMore = payload?.data?.meta?.hasMore
      state.reactsNextPage = payload?.data?.meta?.nextPage
      state.currentPage = payload?.data?.meta?.page
      state.reactsTotal = payload?.data?.meta?.totalDocs
      state.reacts = removeDuplicatesById(state.reacts)
      state.status = false
    })
    builder.addCase(getReactsOfPopup.rejected, (state) => {
      state.status = false
    })
    builder.addCase(getReactsNumber.pending, (state) => {
      state.status = true
    })
    builder.addCase(getReactsNumber.fulfilled, (state, { payload }: any) => {
      state.numberOfReacts = payload?.data
      state.status = false
    })
    builder.addCase(getReactsNumber.rejected, (state) => {
      state.status = false
    })
  },
})

export const { resetInitalState } = statistic.actions

export default statistic.reducer
