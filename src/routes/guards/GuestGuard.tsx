import { useAppSelector } from '@src/store'
import { Navigate, useSearchParams } from 'react-router-dom'

interface MainLayoutProps {
  children: React.ReactNode
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const [searchParams, _setSearchParams] = useSearchParams()
  const token = searchParams.get('token')

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return isAuthenticated ? (
    <Navigate to={token ? `/switch?token=${token}` : `/dashboard`} />
  ) : (
    children
  )
}

export default GuestGuard
