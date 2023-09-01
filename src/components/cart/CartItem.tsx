import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  decreaseProductAmount,
  increaseProductAmount,
  removeFromCart
} from '../../slices/cartSlice'
import { AppDispatch } from '../../store/store'
import { ItemInCart } from '../../types/type'
import Button from '../button'

function CartItem({ item }: { item: ItemInCart }) {
  const dispatch = useDispatch<AppDispatch>()

  const handleDecreaseAmount = () => {
    dispatch(decreaseProductAmount(item.id))
  }

  const handleIncreaseAmount = () => {
    dispatch(increaseProductAmount(item.id))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div>
      <div key={item.id} className="flex pb-3 pt-3 border-b border-b-gray-100">
        <img className="max-w-[80px]" src={item.image} alt={item.title} />
        <div className="flex-1 ml-3">
          <div className="text-sm uppercase mt-2 hover:underline">
            <Link to={`/products/${item.id}`}>{`${item.title}`.slice(0, 20)}</Link>
          </div>
          <div className="text-sm text-gray-500">{`${item.price} €`}</div>
          <div className="flex items-center mt-2 border border-gray-200 w-[100px] justify-between px-2 py-1 text-sm">
            <Button onClick={handleDecreaseAmount}>
              <IoMdRemove />
            </Button>
            <div>{item.orderAmount}</div>
            <Button onClick={handleIncreaseAmount}>
              <IoMdAdd />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between mt-2 items-end w-[80px]">
          <Button onClick={handleRemoveFromCart}>
            <RiDeleteBin6Line size={20} />
          </Button>
          <div className="text-red-500">{`${(item.price * item.orderAmount).toFixed(2)} €`}</div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
