import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { makeOrderThunk } from '../../slices/orderSlice'

import { emptyCart } from '../../slices/cartSlice'
import { AppDispatch, RootState } from '../../store/store'
import CartItem from './CartItem'
import Button from '../button'

function Cart({
  setIsCartDropDown
}: {
  setIsCartDropDown?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { cart, auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const currentUserId = auth.loginUser?.id

  const returnTotal = cart.cartArr.reduce((total, item) => {
    return total + item.price * item.orderAmount
  }, 0)

  const handleButtonClick = async () => {
    if (setIsCartDropDown) {
      setIsCartDropDown(false)
      navigate('/orders/checkout')
    } else if (currentUserId) {
      await dispatch(
        makeOrderThunk({
          userId: +currentUserId,
          cartItemList: cart.cartArr.map((item) => {
            return { productId: item.id, quantity: item.orderAmount }
          })
        })
      )
      navigate('/orders/confirmation')
    }
  }

  const handleEmptyCart = () => {
    dispatch(emptyCart())
  }

  return (
    <div className="flex flex-col">
      {cart.cartArr.length === 0 && <div>Add items to your cart</div>}
      {cart.cartArr.length > 0 &&
        cart.cartArr.map((item) => <CartItem key={item.id} item={item} />)}
      <div className="flex justify-between border-t-gray-200 border-t mt-5">
        <div className="font-bold mt-3">Total</div>
        <div className="font-bold mt-3 text-red-500">{`${returnTotal.toFixed(2)} €`}</div>
      </div>
      <Button
        onClick={handleButtonClick}
        className="mt-10 text-white bg-black focus:ring-4 focus:outline-none font-medium hover:bg-gray-800 text-sm max-w-full sm:w-auto px-5 py-2.5 text-center">
        Check Out
      </Button>
      <Button
        onClick={handleEmptyCart}
        className="mt-3 bg-gray-100 hover:bg-gray-200 focus:outline-none font-bold  text-sm max-w-full  sm:w-auto px-5 py-2.5 text-center">
        Empty Cart
      </Button>
    </div>
  )
}

export default Cart
