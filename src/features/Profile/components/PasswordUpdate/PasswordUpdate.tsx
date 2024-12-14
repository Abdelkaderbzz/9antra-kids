import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '@store/index'
import { updatePassword } from '@store/slices/profileSlice/profileThunk'
import Button from '@src/components/Button/Button'
import { resetPassword } from '@store/slices/forgetpassword/forgetPasswordThunk'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { message } from 'antd'
import InputFieldV2 from '@src/components/InputFieldV2/InputFieldV2'
import { ReactComponent as Security } from '../../../../assets/icons/profile/Vector.svg'
interface passwordUpdateProp {
  isReset: boolean
  token?: string | null
}
const PasswordUpdate = ({ token, isReset }: passwordUpdateProp) => {
  const { t } = useTranslation('profile')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      ...(isReset ? {} : { oldPassword: '' }),
      ...(!token ? {} : { token: token }),
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      ...(isReset
        ? {}
        : {
            oldPassword: Yup.string()
              .required('old Password is required')
              .min(8, 'password must be at least 8 characters')
              .max(20, 'oldPassword must be less or equal 20 characters'),
          }),

      password: Yup.string()
        .required('New Password is required')
        .min(6, 'New Password is too weak!')
        .max(20, 'password must be less or equal 20 characters'),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Password must match')
        .required('Confirm New Password is required')
        .max(20, 'confirm password must be less or equal 20 characters'),
    }),
    onSubmit: (values) => {
      setLoading(true)
      try {
        if (isReset) {
          dispatch(resetPassword(values)).then((response: any) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
              navigate('/login')
            }
          })
        } else {
          dispatch(updatePassword(values))
        }
      } catch (error) {
        message.error(t('password_error'))
      } finally {
        setLoading(false)
      }
    },
  })
  return (
    <form className="password-update" onSubmit={formik.handleSubmit}>
      <div className="password-update-fields">
        <div className="password-update-fields_header">
          <h2 className="profile-update-title">{t('edit_password')}</h2>
          <Button
            variant="primary"
            className="outlined_submit_button"
            type={'submit'}
            label={'Update Your Password'}
            isLoading={loading}
          ></Button>
        </div>
        {!isReset && (
          <InputFieldV2
            prefix={<Security />}
            formik={formik}
            field={{
              name: 'oldPassword',
              type: 'password',
              placeholder: '*****************',
              label: 'Old Password',
              redStar: '*',
            }}
          />
        )}
        <InputFieldV2
          prefix={<Security />}
          formik={formik}
          field={{
            name: 'password',
            type: 'password',
            placeholder: 'Enter your new Password',
            label: 'New password',
            redStar: '*',
          }}
        />
        <InputFieldV2
          prefix={<Security />}
          formik={formik}
          field={{
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'confirm Password',
            label: 'Confirm New Password',
            redStar: '*',
          }}
        />
      </div>
    </form>
  )
}

export default PasswordUpdate
