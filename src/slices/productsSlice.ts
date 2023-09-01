import { ProductRequest } from '../types/type'
import { Category } from '../types/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Product } from '../types/type'
import api from '../api'

type ProductState = {
  isLoading: boolean
  error: null | string
  items: Product[]
  filteredProductArr: Product[]
  item: null | Product
  categories: Category[]
  selectedCategory: null | Category
}

const initialState: ProductState = {
  isLoading: false,
  error: null,
  items: [],
  filteredProductArr: [],
  item: null,
  categories: [],
  selectedCategory: null
}

export const fetchProductsThunk = createAsyncThunk('products/fetch', async () => {
  try {
    const res = await api.get('/products')
    const products = await res.data
    return products
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const findProductByIdThunk = createAsyncThunk(
  'products/find-product',
  async (id: number) => {
    try {
      const res = await api.get(`/products/${id}`)
      const product = await res.data
      return product
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const addProductThunk = createAsyncThunk(
  'products/add-product',
  async (newProduct: Partial<ProductRequest>) => {
    try {
      const res = await api.post('/products', newProduct)
      const addedProduct = await res.data
      return addedProduct
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)
export const updateProductThunk = createAsyncThunk(
  'products/update-product',
  async (productToUpdate: ProductRequest) => {
    try {
      const res = await api.put(`/products/${productToUpdate.id}`, productToUpdate)
      const updatedProduct = await res.data
      return updatedProduct
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const removeProductThunk = createAsyncThunk(
  'products/remove-product',
  async (id: number) => {
    try {
      await api.delete(`products/${id}`)
      return id
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const fetchCategoriesThunk = createAsyncThunk('categories/fetch', async () => {
  try {
    const res = await api.get('/categories')
    const categories = await res.data
    return categories
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filteredProductsAction(state, action) {
      const filteredProducts = state.items.filter(
        (item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.category.name.toLowerCase() === action.payload.toLowerCase()
      )
      const selectedCategory =
        state.categories.find((item) => item.name.toLowerCase() === action.payload.toLowerCase()) ||
        null
      return {
        ...state,
        filteredProductArr: action.payload.length > 0 ? filteredProducts : [...state.items],
        selectedCategory: selectedCategory
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProductsThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(removeProductThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(removeProductThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(removeProductThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = state.items.filter((item) => item.id !== action.payload)
    })
    builder.addCase(findProductByIdThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(findProductByIdThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(findProductByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.item = action.payload
    })
    builder.addCase(fetchCategoriesThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategoriesThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    })
    builder.addCase(addProductThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addProductThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(addProductThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = [action.payload, ...state.items]
    })
    builder.addCase(updateProductThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateProductThunk.rejected, (state) => {
      state.error = 'something went wrong'
      state.isLoading = false
    })
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      const updatedProducts = state.items.map((item) => {
        if (item.id === +action.payload.id) {
          return action.payload
        }
        return item
      })
      state.isLoading = false
      state.items = updatedProducts
      state.item = action.payload
    })
  }
})
export const { filteredProductsAction } = productsSlice.actions

export default productsSlice.reducer
