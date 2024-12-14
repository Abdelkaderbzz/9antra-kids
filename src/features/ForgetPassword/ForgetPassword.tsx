import { useAppDispatch } from '@src/store'
import InputField from '@src/components/InputField/InputField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '@src/store/index'
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import AuthNavigation from '@src/components/AuthNavigation/AuthNavigation'
import { forgetPassword } from '@src/store/slices/forgetpassword/forgetPasswordThunk'
import { useNavigate } from 'react-router-dom'
import LazyLoad from '@src/components/LazyLoad/LazyLoad'
import SwicthLanguage from '@src/components/SwicthLanguage/SwicthLanguage'
import Logo from '@src/components/Logo/Logo'
import { useTranslation } from 'react-i18next'

const ForgetPassword = () => {
  const { t } = useTranslation('login')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useSelector((state: RootState) => state.fogotPassword)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const formik = useFormik({
    initialValues: {
      email: '',
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
    }),
    onSubmit: (values) => {
      dispatch(forgetPassword(values)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/reset-wait')
        }
      })
    },
  })

  return (
    <>
      <div className="auth-container">
        <header className="auth_header">
          <Logo />
          <SwicthLanguage />
        </header>
        <div className="auth_sections">
          <form className="auth_first_section" onSubmit={formik.handleSubmit}>
            {status && <LazyLoad />}
            <div className="auth-form-greeting">
              <p>Forgot Your Password? </p>
              <span>Please enter your email to reset your password.</span>
            </div>
            <InputField
              formik={formik}
              field={{
                class: 'auth-input-container',
                name: 'email',
                type: 'text',
                placeholder: 'Enter your email',
                label: 'Email:',
                redStar: '*',
              }}
            />
            <Button
              label={status ? `${t('loading')}` : `${t('submit')}`}
              className="auth_submit_button"
              type="submit"
              disabled={status}
            />
            <AuthNavigation forWhat={'forget'} />
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
