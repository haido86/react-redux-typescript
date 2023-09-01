import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { updateProductThunk } from '../../slices/productsSlice'
import { AppDispatch, RootState } from '../../store/store'
import { CategoryOption, ProductRequest, Product } from '../../types/type'
import { getOptions } from '../../utils/options'
import Button from '../button'

function UpdateProductForm({ productId }: { productId: number }) {
  const { products, auth } = useSelector((state: RootState) => state)
  const [formOpen, setFormOpen] = useState<boolean>()
  const [updateProduct, setUpdateProduct] = useState<Partial<Product> | undefined>()
  const dispatch = useDispatch<AppDispatch>()

  const options: CategoryOption[] = getOptions(products.categories)
  const findProductToUpdate = products.items.find((product) => product.id === +productId)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target
    if (products.items) {
      setUpdateProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
    }
  }
  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    const category = selectedOption?.value
    if (category) {
      const selectedCategory = products?.categories.find(
        (cat) => cat.name.toLowerCase() === category.toLowerCase()
      )
      if (selectedCategory) {
        setUpdateProduct((prevProduct) => ({
          ...prevProduct,
          category: selectedCategory
        }))
      }
    }
  }
  const handleInventoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = event.target.value
    if (products.items) {
      setUpdateProduct((prevProduct) => ({
        ...prevProduct,
        inventory: { id: 0, quantity: +quantity }
      }))
    }
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (findProductToUpdate && updateProduct) {
      const product: ProductRequest = {
        id: findProductToUpdate.id,
        categoryId: updateProduct?.category?.id || findProductToUpdate.category.id,
        price: updateProduct?.price || findProductToUpdate.price,
        title: updateProduct?.title || findProductToUpdate.title,
        description: updateProduct?.description || findProductToUpdate.description,
        image: updateProduct?.image || findProductToUpdate.image,
        quantity: updateProduct.inventory?.quantity || findProductToUpdate.inventory.quantity
      }
      dispatch(updateProductThunk(product))
    }
    setFormOpen(!formOpen)
  }

  return (
    <div>
      {auth?.loginUser?.role === 'ADMIN' && (
        <Button
          className="flex justify-center font-bold bg-yellow-300 max-w-80 rounded-md px-4 py-1"
          onClick={() => setFormOpen(!formOpen)}>
          Edit Product Info
        </Button>
      )}
      {formOpen && (
        <div className="z-10 right-0 top-32 absolute duration-300 bg-white shadow w-full p-20 lg:top-20 sm:max-w-[500px]">
          <h2 className="text-xl font-bold mb-2">Update Product Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={findProductToUpdate?.title}
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
                defaultValue={findProductToUpdate?.image}
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
                defaultValue={findProductToUpdate?.price}
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
                defaultValue={findProductToUpdate?.description}
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
                defaultValue={findProductToUpdate?.inventory.quantity}
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
                defaultValue={
                  findProductToUpdate?.category?.name
                    ? options.find(
                        (option) =>
                          option.value.toLowerCase() ===
                          findProductToUpdate.category.name.toLowerCase()
                      )
                    : null
                }
              />
            </div>
            <div className="flex flex-col mt-10">
              <Button
                type="submit"
                className="text-white uppercase bg-black focus:ring-4 focus:outline-none font-medium hover:bg-gray-800 text-sm max-w-full sm:w-auto px-5 py-2.5 text-center">
                Update Product Info
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default UpdateProductForm
