import { useEffect } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/button'
import UpdateProductForm from '../../components/form/UpdateProductForm'
import { addToCartAction } from '../../slices/cartSlice'
import { findProductByIdThunk } from '../../slices/productsSlice'
import { AppDispatch, RootState } from '../../store/store'

function ProductDetail() {
  const { products, auth } = useSelector((state: RootState) => state)

  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  useEffect(() => {
    if (id) dispatch(findProductByIdThunk(+id))
  }, [id])

  if (!id) {
    return <div>Product not found</div>
  }

  return (
    <>
      <div className="flex justify-start">
        <Link to="/" className="ml-20 hover:bg-gray-200 rounded-full p-2 max-w-ful mr-4">
          <IoArrowBackOutline size={20} />
        </Link>
        {auth?.loginUser?.role === 'ADMIN' && <UpdateProductForm productId={+id} />}
      </div>
      {products.item && (
        <div className="sm:grid sm:grid-cols-2 flex flex-col">
          <img
            className="p-10 w-[400px] h-auto sm:w-[600px] "
            src={products.item.image}
            alt={products.item.title}
          />
          <div className="sm:m-10 m-2">
            <div className="bg-gray-300 p-2">
              <h2 className="font-bold text-xl my-2">{products.item.title}</h2>
              <div className="font-bold text-2xl text-red-600 mb-2">
                {`${products.item.price} €`}
              </div>
              <div className="my-2">choices of variant (Dropdown)</div>
              <Button
                onClick={() => dispatch(addToCartAction(products.item))}
                className="my-2 bg-red-500 text-white p-2 items-center font-bold w-full">
                Add to cart
              </Button>
            </div>
            <div className="p-2 my-2 bg-white border border-gray-200 order-1 sm:order-none">
              {products.item.description}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ProductDetail
