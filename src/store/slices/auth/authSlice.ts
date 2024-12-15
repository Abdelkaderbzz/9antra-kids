/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, register } from './authThunk'
import { clearTokens, setTokens } from '@src/utils/token'
import { AuthState } from '../../../types/slicesTypes'
import { message } from 'antd'
import { updateAvatar, updateCredential } from '../profileSlice/profileThunk'
// import { updateAvatar, updateCredential } from '../profileSlice/profileThunk'

const initialState: AuthState = {
  status: 'idle',
  isAuthenticated: false,
  isInitialised: false,
  permissions: null,
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialise: (state, action) => {
      const { isAuthenticated, user } = action.payload
      state.isAuthenticated = isAuthenticated
      state.isInitialised = true
      state.user = user
    },
    restore: (state) => {
      state.error = null
    },
    setPermissions: (state, { payload }) => {
      state.permissions = payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      ;(state.status = 'idle'), localStorage.clear()
      clearTokens()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(login.fulfilled, (state, _action: PayloadAction<any>) => {
      const mockData = {
        token: 'mockToken12345',
        user: {
          avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=150',
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-01-10T15:00:00Z',
          role: 'user',
          id: 'mockUserId123',
          name: 'John Doe',
          email: 'john.doe@example.com',
          roles: ['user', 'editor'],
        },
      }
      const { token, user } = mockData
      message.success(`Welcome Back, ${user.name}`)
      setTokens(token)
      state.isAuthenticated = true
      state.user = user
      state.status = 'succeeded'
    })
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload

      state.status = 'failed'
      message.error(state.error)
    })

    //? updateAvatar

    builder.addCase(updateAvatar.fulfilled, (state, action: PayloadAction<any>) => {
      const user = action.payload.data
      if (state.user) {
        state.user.avatar = user.avatar
      }
      state.status = 'succeeded'
    })

    builder.addCase(updateCredential.fulfilled, (state, action: PayloadAction<any>) => {
      const user = action.payload.data
      if (state.user) {
        state.user.name = user.name
        state.user.email = user.email
      }
      message.success('credentials updated successfully')
      state.status = 'succeeded'
    })
    //? register

    builder.addCase(register.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
      const { token, user } = action.payload?.data
      setTokens(token)
      state.isAuthenticated = true
      state.user = user
      state.status = 'succeeded'
      message.success(`Welcome ${user?.name}`)
      state.status = 'succeeded'
    })
    builder.addCase(register.rejected, (state, action: any) => {
      state.error = action.error.message
      state.status = 'failed'
      message.error(state.error)
    })
  },
})

export const { initialise, restore, logout, setPermissions } = authSlice.actions

export default authSlice.reducer
