import { FaCartPlus, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeProductThunk } from '../../slices/productsSlice'
import { AppDispatch, RootState } from '../../store/store'
import { Product } from '../../types/type'
import Button from '../button'

type AddToCartFunction = (product: Product) => void

function ProductCard({ product, addToCart }: { product: Product; addToCart: AddToCartFunction }) {
  const { auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const handleAddToCart = () => {
    addToCart(product)
  }
  const handleRemoveProduct = () => {
    dispatch(removeProductThunk(product.id))
  }

  return (
    <div
      className=" m-1 relative flex flex-col items-center object-cover border border-gray-200 rounded-md"
      key={product.id}>
      <Button
        onClick={handleAddToCart}
        className="absolute bottom-2 right-2 bg-yellow-300 rounded-full p-2">
        <FaCartPlus size={20} />
      </Button>

      {auth?.loginUser?.role === 'ADMIN' && (
        <div>
          <Link
            to={`/products/${product.id}`}
            className="absolute top-2 right-2 font-bold bg-green-300 flex items-center p-2 ">
            <FaRegEdit size={20} />
          </Link>
          <Button
            onClick={handleRemoveProduct}
            className="absolute top-2 left-2 font-bold bg-red-300 flex items-center p-2 ">
            <RiDeleteBin5Line size={20} />
          </Button>
        </div>
      )}
      <img className="h-40 w-auto p-3" src={product.image} alt={product.title} />
      <div className="border-t-gray-100">
        <Link to={`/products/${product.id}`}>
          <div className="mt-2 font-bold">{`${product.title}`.slice(0, 12)}</div>
        </Link>
        <div className="text-red-500 mb-2">{`${product.price} €`}</div>
      </div>
    </div>
  )
}

export default ProductCard
