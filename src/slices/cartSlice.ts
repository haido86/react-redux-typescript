import { createSlice } from '@reduxjs/toolkit'

import { ItemInCart } from '../types/type'

type CartState = {
  isLoading: boolean
  error: string
  cartArr: ItemInCart[]
}
const initialState: CartState = {
  isLoading: false,
  error: '',
  cartArr: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartAction: (state, action) => {
      const foundProduct = state.cartArr.find((item) => item.id == action.payload.id)
      if (foundProduct) {
        state.cartArr = state.cartArr.map((item) => {
          if (item.id == action.payload.id) {
            item.orderAmount += 1
          }
          return item
        })
      } else {
        state.cartArr.push({ ...action.payload, orderAmount: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.cartArr.find((item) => item.id == action.payload)
      if (itemToRemove) {
        state.cartArr = state.cartArr.filter((item) => item.id !== action.payload)
      }
    },
    increaseProductAmount: (state, action) => {
      const itemToIncrease = state.cartArr.find((item) => item.id === +action.payload)
      if (itemToIncrease) {
        state.cartArr = state.cartArr.map((item) => {
          if (item.id == action.payload) {
            item.orderAmount += 1
          }
          return item
        })
      }
    },
    decreaseProductAmount: (state, action) => {
      const itemToDecrease = state.cartArr.find((item) => item.id === +action.payload)
      if (itemToDecrease) {
        if (itemToDecrease.orderAmount == 1) {
          state.cartArr = state.cartArr.filter((item) => item.id != +action.payload)
        }
        state.cartArr = state.cartArr.map((item) => {
          if (item.id == action.payload) {
            item.orderAmount -= 1
          }
          return item
        })
      }
    },
    emptyCart: () => {
      return initialState
    }
  },
  extraReducers: {}
})

export const {
  addToCartAction,
  removeFromCart,
  increaseProductAmount,
  decreaseProductAmount,
  emptyCart
} = cartSlice.actions

export default cartSlice.reducer
