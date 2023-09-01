export type User = {
  index: number
  id: number
  role: Role
  username: string
}

export type Category = {
  id: number
  name: string
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type Inventory = {
  id: number
  quantity: number
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
  inventory: Inventory
}

export type ProductRequest = {
  id: number
  categoryId: number
  price: number
  title: string
  description: string
  image: string
  quantity: number
}

export type OrderItem = {
  id: number
  quantity: number
  product: Product
}

export type Order = {
  id: number
  purchaseAt: string
  user: User
  orderItemList: OrderItem[]
}

export type ProductInRequest = {
  productId: number
  quantity: number
}
export type OrderRequest = {
  userId: number
  cartItemList: ProductInRequest[]
}

export type OrderAmount = { orderAmount: number }
export type ItemInCart = Product & OrderAmount

export type CategoryOption = { value: string; label: string }
