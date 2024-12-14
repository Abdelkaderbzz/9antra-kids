import loginimg from '@src/assets/images/auth/loginimg.svg'
import { BsFillShieldLockFill } from 'react-icons/bs'
import PasswordUpdate from '@src/features/Profile/components/PasswordUpdate/PasswordUpdate'
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  return (
    <div className="auth-container">
      <div className="auth-container-left-side">
        <div className="auth-container-form">
          <div className="auth-form-greeting">
            <p>
              Set Your New Password <BsFillShieldLockFill style={{ fontSize: '27px' }} />{' '}
            </p>
            <span>
              Welcome to our password reset page. Your security matters to us. Let's get you back in
              action with a new password.
            </span>
          </div>
          <PasswordUpdate token={token} isReset={true} />
        </div>
      </div>
      <div className="auth-container-right-side">
        <img src={loginimg} alt="" />
      </div>
    </div>
  )
}
export default ResetPassword
