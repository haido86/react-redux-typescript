import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { Order, OrderRequest } from '../types/type'

type OrderState = {
  isLoading: boolean
  item: Order | null
  items: Order[]
  error: string
}

const initialState: OrderState = {
  isLoading: false,
  error: '',
  item: null,
  items: []
}

export const makeOrderThunk = createAsyncThunk(
  'orders/create-order',
  async (orderRequest: OrderRequest) => {
    try {
      const res = await api.post('/orders', orderRequest)
      const order = await res.data
      return order
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const findOrderById = createAsyncThunk('orders/find-order', async (orderId: number) => {
  try {
    const res = await api.get(`/orders/${orderId}`)
    const order = await res.data
    return order
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  try {
    const res = await api.get('/orders')
    const orders = await res.data
    return orders
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makeOrderThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(makeOrderThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(makeOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.item = action.payload
    })
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchOrders.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(findOrderById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(findOrderById.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(findOrderById.fulfilled, (state, action) => {
      state.isLoading = false
      state.item = action.payload
    })
  }
})

export default orderSlice.reducer
