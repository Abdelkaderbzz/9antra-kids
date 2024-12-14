export interface AuthState {
  status: string
  isAuthenticated: boolean
  isInitialised: boolean
  permissions: any
  user: {
    avatar: string
    createdAt: string
    updatedAt: string
    role: string
    id: string
    name: string
    email: string
    roles?: any
  } | null
  error: string | null
}
export type userTypes = {
  avatar: string
  createdAt: string
  updatedAt: string
  role: string
  id: string
  name: string
  email: string
} | null
export type LoginPayload = {
  email: string
  password: string
}
export type RegisterPayload = {
  name: string
  email: string
  password: string
  confirmPassword?: string
}
export type updateCredentialPayload = {
  name: string
  email: string
}
export type updateAvatarPayload = {
  avatar: File | null
}
export type updatePasswordPayload = {
  oldPassword?: string | undefined
  password: string
  confirmPassword: string
}
export type resetPasswordPayload = {
  password: string
  confirmPassword: string
  token: string | null
  oldPassword?: string | undefined
}
export type profileState = {
  status: string
  error: null | string
  isUpdated: boolean
}

export type StatusSlicesType = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
