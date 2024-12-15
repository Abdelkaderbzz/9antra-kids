import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
// import VectorSignUp from '@src/assets/images/auth/VectorSignUp.svg'
import SwicthLanguage from '@src/components/SwicthLanguage/SwicthLanguage'
import Logo from '@src/components/Logo/Logo'
import InputField from '@src/components/InputField/InputField'
import Button from '@src/components/Button/Button'
import { RootState } from '@src/store/index'
import { useAppDispatch, useAppSelector } from '@src/store'
import { login } from '@src/store/slices/auth/authThunk'

const Login = () => {
  const { t } = useTranslation('login')
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const { status } = useAppSelector((state: RootState) => state.auth)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format.')
        .matches(emailRegex, 'Invalid email format.')
        .test(
          'no-extra-chars',
          'Invalid email format. No extra characters allowed.',
          (value: string | undefined) => {
            if (!value) {
              return true
            }
            return emailRegex.test(value)
          },
        )
        .required('Email is required.'),
      password: Yup.string()
        .required('Password cannot be empty')
        .min(8, 'Password must have at least 8 characters.')
        .max(20, 'Password cannot have more than 20 characters'),
    }),
    onSubmit: (values) => {
      dispatch(login(values))
    },
  })

  return (
    <div className="auth_container">
      <header className="auth_header">
        <Logo />
        <SwicthLanguage />
      </header>
      <div className="auth_sections">
        <form onSubmit={formik.handleSubmit} className="auth_first_section">
          <div>
            <div className="welcome_desc">
              <p className="welcome_back">{t('welcome_back')}</p>
              <p className="description">{t('description')}</p>
            </div>
            <div className="auth_or_second_methode">
              <div className="auth_or_second_methode_ligne_1"></div>
              <p className="auth_or_second_methode_label"> {t('continue_with_email')}</p>
              <span className="auth_or_second_methode_ligne_2"></span>
            </div>
            <div>
              <InputField
                formik={formik}
                field={{
                  class: 'auth_input_container auth_input_email',
                  name: 'email',
                  type: 'text',
                  placeholder: `${t('work_mail.placeholder')}`,
                  label: `${t('work_mail.label')}`,
                  redStar: '*',
                }}
              />
              <InputField
                formik={formik}
                field={{
                  class: 'auth_input_container auth_input_password',
                  name: 'password',
                  type: 'password',
                  placeholder: `${t('password.placeholder')}`,
                  label: `${t('password.label')}`,
                  redStar: '*',
                }}
              />
              <Link to="/forget-password" className="forgot_password">
                {t('forgot_password')}
              </Link>
            </div>
            <Button
              label={status === 'loading' ? `${t('loading')}` : `${t('continue')}`}
              className="auth_submit_button"
              type="submit"
              disabled={status === 'loading'}
            />
            {/* <Button
              label={t('sign_up')}
              icon={`${VectorSignUp}`}
              className="auth_sign_up"
              onClick={() => navigate('/register')}
              type="button"
              disabled={status === 'loading'}
            /> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
