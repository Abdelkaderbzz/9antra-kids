export interface Step {
  id: number
  title: string
  description?: string
}

export interface Category {
  id: number
  name: string
  image: string
}

export interface FormData {
  name: string
  email: string
  selectedCategories: number[]
  preferences?: Record<string, any>
}
