import jwt_decode from 'jwt-decode'
import { Role, User } from '../types/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setNotification } from './notificationSlice'
import { getDecodedTokenFromStorage } from '../utils/token'
import axios from 'axios'
import { baseURL } from '../api/apiConfig'

type LoginPayload = {
  username: string
  password: string
}

type AuthState = {
  isLoading: boolean
  loginUser: null | User
  error: string
  success: boolean
}

export interface DecodedToken {
  user_id: number
  username: string
  role: Role
}

const initialState: AuthState = {
  isLoading: false,
  loginUser: null,
  error: '',
  success: false
}

export const login = createAsyncThunk('auth/login', async (user: LoginPayload, { dispatch }) => {
  try {
    const res = await axios.post(`${baseURL}/auth/signin`, user)
    const data = await res.data
    if (data) {
      dispatch(setNotification({ content: 'Login successfully', duration: 5000, type: 'success' }))
      return data.token
    } else {
      dispatch(
        setNotification({
          content: 'Wrong email or password. Please try again',
          duration: 5000,
          type: 'error'
        })
      )
      throw new Error('Invalid login credentials')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const signup = createAsyncThunk('auth/signup', async (user: LoginPayload, { dispatch }) => {
  try {
    const res = await axios.post(`${baseURL}/auth/signup`, user)
    const data = await res.data

    if (data) {
      dispatch(
        setNotification({ content: 'Sign up successfully', duration: 5000, type: 'success' })
      )
      dispatch(login(user))
      return data
    } else {
      dispatch(
        setNotification({
          content: 'Wrong email or password. Please try again',
          duration: 5000,
          type: 'error'
        })
      )
      throw new Error('Invalid login credentials')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserFromStorage(state) {
      const user = getDecodedTokenFromStorage()
      if (user) {
        state.loginUser = user
        state.success = true
      }
    },
    logOut(state) {
      localStorage.clear()
      state.loginUser = null
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
      state.loginUser = initialState.loginUser
      state.error = 'Something went wrong'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      const token = action.payload
      localStorage.setItem('token', token)
      const decodedToken: DecodedToken = jwt_decode(token)

      const user: User = {
        id: decodedToken.user_id,
        username: decodedToken.username,
        role: decodedToken.role
      }
      state.loginUser = user
      state.error = ''
      state.success = true
    })
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(signup.rejected, (state) => {
      state.isLoading = false
      state.loginUser = initialState.loginUser
      state.error = 'Something went wrong'
      state.success = false
    })
    builder.addCase(signup.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
      state.success = true
    })
  }
})

export const { logOut, getUserFromStorage } = authSlice.actions

export default authSlice.reducer
