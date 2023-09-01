import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { User } from '../types/type'

type UserState = {
  isLoading: boolean
  error: null | string
  usersData: User[]
  filteredUserArr: User[]
}

const initialState: UserState = {
  isLoading: false,
  error: null,
  usersData: [],
  filteredUserArr: []
}

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  try {
    const res = await api.get('/users')
    const users = await res.data
    return users
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const findByUserById = createAsyncThunk('users/find-user', async (id: number) => {
  try {
    const res = await api.get(`/users/${id}`)
    const user = await res.data
    return user
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filteredUserAction(state, action) {
      const filteredUsers = state.usersData.filter((user) =>
        user.username.toLowerCase().includes(action.payload.toLowerCase())
      )
      return {
        ...state,
        filteredUserArr: action.payload.length > 0 ? filteredUsers : [...state.usersData]
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersData = action.payload
    })
    builder.addCase(findByUserById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(findByUserById.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(findByUserById.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersData = action.payload
    })
  }
})
export const { filteredUserAction } = usersSlice.actions

export default usersSlice.reducer
