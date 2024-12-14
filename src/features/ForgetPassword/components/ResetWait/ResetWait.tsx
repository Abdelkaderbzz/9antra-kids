import loginimg from '@src/assets/images/auth/loginimg.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const ResetWait = () => {
  const resetPswMessage = window.localStorage.getItem('resetPasswordMessage')
  const navigate = useNavigate()

  useEffect(() => {
    // Check if resetPswMessage is null or undefined and navigate accordingly
    if (!resetPswMessage) {
      navigate('/login')
    }
  }, [resetPswMessage, navigate])

  return (
    <div className="auth-container">
      <div className="auth-container-left-side">
        <form className="auth-container-form">
          <div className="auth-form-greeting">
            <p>Check Your Email? </p>
            <span>{resetPswMessage}</span>
          </div>
        </form>
      </div>
      <div className="auth-container-right-side">
        <img src={loginimg} alt="" />
      </div>
    </div>
  )
}

export default ResetWait
