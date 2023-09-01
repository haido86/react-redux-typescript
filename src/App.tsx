import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import { fetchCategoriesThunk, fetchProductsThunk } from './slices/productsSlice'
import CheckOut from './pages/user/CheckOut'
import Home from './pages/user/Home'
import ProductDetail from './pages/user/ProductDetail'
import UserList from './pages/admin/UserList'
import { AppDispatch, RootState } from './store/store'
import { getUserFromStorage } from './slices/authSlice'
import SignUpForm from './components/form/SignUpForm'
import OrderConfirmation from './pages/user/OrderConfirmation'
import SignInForm from './components/form/SignInForm'
import Notification from './components/notification'
import ProductList from './pages/admin/ProductList'
import OrderList from './pages/admin/OrderList'
import OrderDetail from './pages/admin/OrderDetail'
import Dashboard from './pages/admin/Dashboard'
import AddProductForm from './components/form/AddProductForm'

function App() {
  const { auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProductsThunk())
    dispatch(fetchCategoriesThunk())
    dispatch(getUserFromStorage())
  }, [dispatch])

  return (
    <Router>
      <div className="container">
        <Notification />
        <Header />
        <div className="body">
          <Routes>
            {auth?.loginUser?.role === 'ADMIN' ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/orders" element={<OrderList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/products/new" element={<AddProductForm />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/signin" element={<SignInForm redirectToCheckout={true} />} />
                <Route path="/checkout" element={<CheckOut />} />
              </>
            )}
            {auth?.loginUser?.role === 'USER' && (
              <>
                <Route path="/orders/checkout" element={<CheckOut />} />
                <Route path="/orders/confirmation" element={<OrderConfirmation />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
