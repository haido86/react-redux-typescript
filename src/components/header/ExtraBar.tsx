import { IoArrowBackOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { filteredProductsAction } from '../../slices/productsSlice'
import { AppDispatch, RootState } from '../../store/store'
import Button from '../button'

function ExtraBar() {
  const { products } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const filterCategory = products.selectedCategory

  return (
    <div className="mx-10 justify-around px-2 py-1 flex flex-col sm:flex-row">
      {products.filteredProductArr.length === 0 ||
      products.filteredProductArr.length === products.items.length ||
      products.selectedCategory === null ? (
        products?.categories.map((category) => (
          <div key={category.id}>
            <div className="flex mb-1">
              <Button
                onClick={() => {
                  dispatch(filteredProductsAction(category.name))
                  navigate('/')
                }}
                className="bg-gray-200 rounded-full px-3 py-1 capitalize"
                key={category.id}>
                {category.name.toLowerCase()}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex">
          <Button
            className="mr-20 hover:bg-gray-200 rounded-full p-2"
            onClick={() => {
              dispatch(filteredProductsAction(''))
              navigate('/')
            }}>
            <IoArrowBackOutline size={20} />
          </Button>
          <div className="bg-gray-200 rounded-full px-3 py-1 capitalize">
            {filterCategory?.name.toLowerCase()}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExtraBar
