import { useEffect } from 'react'
// import axiosInstance from '../utils/axios'
import { useSelector, useDispatch } from 'react-redux'
import { clearTokens } from '../utils/token'
import useIsMountedRef from '../hook/useIsMountedRef'
import { RootState } from '@src/store'
import { initialise } from '@src/store/slices/auth/authSlice'
import Loader from '@src/components/Loader/Loader'

interface AuthProviderProps {
  children: React.ReactNode
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const isMounted = useIsMountedRef()

  const { isInitialised } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isMounted.current) {
      return
    }

    async function fetchUser() {
      try {
        // const { access_token } = getTokens()
        if (true) {
          // const response = await axiosInstance.get('/api/profile')
          const mockData = {
            token: 'mockToken12345',
            user: {
              avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=150',
              createdAt: '2024-01-01T10:00:00Z',
              updatedAt: '2024-01-10T15:00:00Z',
              role: 'user',
              id: 'mockUserId123',
              name: 'John Doe',
              email: 'john.doe@example.com',
              roles: ['user', 'editor'],
            },
          }
          if (true) {
            const user = mockData.user
            dispatch(initialise({ isAuthenticated: true, user }))
          } else {
            dispatch(initialise({ isAuthenticated: false, user: null }))
            clearTokens()
          }
        } else {
          dispatch(initialise({ isAuthenticated: false, user: null }))
          clearTokens()
        }
      } catch (error) {
        dispatch(initialise({ isAuthenticated: false, user: null }))
        clearTokens()
      }
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isInitialised) {
    return <Loader />
  }

  return <>{children}</>
}

export default AuthProvider
