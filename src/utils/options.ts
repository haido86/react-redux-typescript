import { Category, CategoryOption } from './../types/type'

export const getOptions = (categories: Category[]): CategoryOption[] => {
  return categories.map((category) => ({
    value: category.name.toLowerCase(),
    label: category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()
  }))
}
