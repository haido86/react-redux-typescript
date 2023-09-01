import Select from 'react-select'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addProductThunk } from '../../slices/productsSlice'
import { AppDispatch, RootState } from '../../store/store'
import { CategoryOption, ProductRequest, Product } from '../../types/type'
import { getOptions } from '../../utils/options'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function AddProductForm() {
  const { products } = useSelector((state: RootState) => state)
  const [newProduct, setNewProduct] = useState<Partial<Product> | undefined>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const options: CategoryOption[] = getOptions(products.categories)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target
    if (products.items) {
      setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
    }
  }
  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    const category = selectedOption?.value
    if (category) {
      const selectedCategory = products?.categories.find(
        (cat) => cat.name.toLowerCase() === category.toLowerCase()
      )
      if (selectedCategory) {
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          category: selectedCategory
        }))
      }
    }
  }
  const handleInventoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = event.target.value
    if (products.items) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        inventory: { id: 0, quantity: +quantity }
      }))
    }
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (
      newProduct &&
      newProduct?.title &&
      newProduct?.price &&
      newProduct?.description &&
      newProduct?.category &&
      newProduct?.inventory &&
      newProduct?.inventory?.quantity
    ) {
      const product: Partial<ProductRequest> = {
        categoryId: newProduct.category.id,
        price: newProduct.price,
        title: newProduct.title,
        description: newProduct.description,
        image: newProduct.image || '',

        quantity: newProduct.inventory.quantity
      }
      await dispatch(addProductThunk(product))
      navigate('/products')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ml-5 mb-5">
          <div className="flex">
            <button onClick={() => navigate('/products')}>
              <IoArrowBackOutline size={20} />
            </button>
            <div className="p-2">Products</div>
          </div>
          <div className="flex justify-between max-w-full">
            <div className="font-bold text-lg">New Product</div>
            <div className="flex flex-1 justify-end">
              <button
                type="submit"
                className="m-2 flex justify-center bg-violet-700 text-white w-24 h-10 py-2 px-5 rounded-full font-bold">
                <div>Save</div>
              </button>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
            placeholder="Title"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
            Image Url
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
            placeholder="Image Url"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            max="1000"
            step="0.01"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
            placeholder="Price"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"
            onChange={handleInputChange}
            required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
            Inventory <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="inventory"
            name="inventory"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
            placeholder="inventory"
            onChange={handleInventoryChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
            Category <span className="text-red-500">*</span>
          </label>
          <Select
            options={options}
            name="category"
            id="category"
            onChange={handleCategoryChange}
            value={options.find((option) => option.value === newProduct?.category?.name)}
          />
        </div>
      </form>
    </div>
  )
}

export default AddProductForm
