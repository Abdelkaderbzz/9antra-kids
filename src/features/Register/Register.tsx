import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { ReactComponent as RegisterIcon } from '@src/assets/images/auth/register.svg'
import VectorSignUp from '@src/assets/images/auth/VectorSignUp.svg'
import SwicthLanguage from '@src/components/SwicthLanguage/SwicthLanguage'
import Logo from '@src/components/Logo/Logo'
import InputField from '@src/components/InputField/InputField'
import Button from '@src/components/Button/Button'
import { RootState } from '@src/store/index'
import { useAppDispatch, useAppSelector } from '@src/store'
import { register } from '@src/store/slices/auth/authThunk'

const Login = () => {
  const { t } = useTranslation('login')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state: RootState) => state.auth)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const formik = useFormik({
    initialValues: {
      name: '',
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
      name: Yup.string().required('first name cannot be empty'),
      password: Yup.string()
        .required('Password cannot be empty')
        .min(8, 'Password must have at least 8 characters.')
        .max(20, 'Password cannot have more than 20 characters'),
    }),
    onSubmit: (values) => {
      dispatch(register(values))
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
              <p className="welcome_back">Create An Account</p>
              <p className="description">register to get started</p>
            </div>
            <div>
              <InputField
                formik={formik}
                field={{
                  class: 'auth_input_container auth_input_email',
                  name: 'name',
                  type: 'text',
                  placeholder: `${t('password.placeholder')}`,
                  label: `Name`,
                  redStar: '*',
                }}
              />

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
                  class: 'auth_input_container auth_input_email',

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
            <Button
              label={'Login'}
              icon={`${VectorSignUp}`}
              className="auth_sign_up"
              type="button"
              onClick={() => navigate('/login')}
              disabled={status === 'loading'}
            />
          </div>
        </form>
        <div className="auth_second_section">
          <motion.div
            animate={{ scale: [0.8, 0.9, 0.8] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <RegisterIcon className="bg_section2" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login
