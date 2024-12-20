/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@src/utils/axios'
import { RegisterPayload } from '../../../types/slicesTypes'

type LoginPayload = {
  email: string
  password: string
}

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginPayload, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.post(`/api/login`, loginData)
      return loginData
      // if (response.status === 200) {
      //   return response.data
      // }
    } catch (error: any) {
      const emailError = error?.response?.data?.errors?.email
      const message = error?.response?.data?.message || error?.response?.data
      if (emailError) {
        return rejectWithValue(emailError)
      } else if (message) {
        return rejectWithValue(message)
      } else {
        return rejectWithValue('Something went wrong')
      }
    }
  },
)

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/register`, registerData)
      if (response.status === 201) {
        return response.data
      }

      throw new Error(response.statusText)
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data)
      }
    }
  },
)
