import { useDispatch, useSelector } from 'react-redux'

import { addToCartAction } from '../../slices/cartSlice'
import { AppDispatch, RootState } from '../../store/store'
import { Product } from '../../types/type'
import ProductCard from '../../components/productCard'

function Home() {
  const { products } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  if (products.isLoading) {
    return <div>Loading...</div>
  }

  const addToCart = (product: Product) => {
    dispatch(addToCartAction(product))
  }

  return (
    <div className="min-h-screen">
      <div className="m-5 grid grid-cols-2 gap-y-5 gap-x-2 transition duration-150 sm:grid-cols-3 sm:gap-x-3 sm:p-1 md:grid-cols-4 md:gap-x-1 md:p-2 lg:grid-cols-5 lg:gap-4 lg:p-3">
        {products?.filteredProductArr.length > 0
          ? products.filteredProductArr.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          : products.items.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
      </div>
    </div>
  )
}

export default Home
