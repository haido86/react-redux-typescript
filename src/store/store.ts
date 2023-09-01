import orderSlice from './../slices/orderSlice'
import productsSlice from '../slices/productsSlice'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice'
import notificationSlice from '../slices/notificationSlice'
import authSlice from '../slices/authSlice'
import cartSlice from '../slices/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    users: userSlice,
    auth: authSlice,
    notification: notificationSlice,
    cart: cartSlice,
    orders: orderSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
