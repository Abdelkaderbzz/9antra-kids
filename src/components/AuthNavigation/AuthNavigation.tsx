import { useNavigate } from 'react-router-dom'

interface ForgetPasswordProp {
  forWhat: string
}
const AuthNavigation = ({ forWhat }: ForgetPasswordProp) => {
  const navigate = useNavigate()
  return (
    <div className="forget-password">
      {forWhat === 'login' ? (
        <>
          <div className="forget-password-link">
            <a onClick={() => navigate('/forget-password')}>Forgot password?</a>
          </div>
        </>
      ) : (
        <>
          <nav>
            <span>Already have an account.</span>
            <a onClick={() => navigate('/login')}>Login?</a>
          </nav>
        </>
      )}
    </div>
  )
}

export default AuthNavigation
