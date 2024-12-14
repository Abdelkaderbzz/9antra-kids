import { useState } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RootState, useAppDispatch } from '@store/index'
import { updateCredential, updateAvatar } from '@store/slices/profileSlice/profileThunk'
import Button from '@src/components/Button/Button'
import UploadIcon from '@src/components/UploadIcon/UploadIcon'
import { useTranslation } from 'react-i18next'
import InputFieldV2 from '@src/components/InputFieldV2/InputFieldV2'
import { ReactComponent as Email } from '../../../../assets/icons/profile/Mesage.svg'
import { ReactComponent as User } from '../../../../assets/icons/profile/User Rounded.svg'
import PasswordUpdate from '../PasswordUpdate/PasswordUpdate'
import SectionHeader from '@src/components/SectionHeader/SectionHeader'

interface IProfileFormValues {
  email: string
  name: string
}

const CredentialUpdate = () => {
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const updateProfile = (selectedFile: File | null, values: IProfileFormValues) => {
    if (selectedFile) {
      dispatch(updateAvatar(selectedFile))
    }
    if (values.name === user?.name && values.email === user?.email && !selectedFile) {
      message.error('No changes to update')
    } else {
      dispatch(updateCredential(values))
    }
  }
  const formik = useFormik({
    initialValues: {
      email: `${user?.email}`,
      name: `${user?.name}`,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .matches(
          /^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/,
          'Invalid email address',
        )
        .test(
          'no-special-chars',
          'Email contains disallowed characters',
          (value: string | undefined) => !value || /^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(value),
        )
        .required('Email is required'),
      name: Yup.string()
        .required('name is required')
        .min(3, 'name length must be greater or equal to 3'),
    }),
    onSubmit: async (values) => {
      try {
        updateProfile(selectedFile, values)
      } catch (error) {
      } finally {
      }
    },
  })
  return (
    <form className="credentials-update" onSubmit={formik.handleSubmit}>
      <SectionHeader title={t('edit_profile')}>
        {' '}
        <Button
          className="secondary_submit_button"
          label={t('save_changes')}
          type={'submit'}
        ></Button>
      </SectionHeader>
      <div className="profile-forms">
        <div className="profile-update-container">
          <h2 className="profile-update-title">{t('basic_info')}</h2>
          <div>
            <div className="credentials-update-fields">
              <div className="upload-image-container">
                <UploadIcon setImageUrl={setImageUrl} setSelectedFile={setSelectedFile}>
                  <div className="image-container">
                    {imageUrl ? (
                      <img className="default-avatar" src={imageUrl} alt="Uploaded" />
                    ) : (
                      <img
                        src={`${user?.avatar}`}
                        alt="User"
                        className="default-avatar"
                        crossOrigin="anonymous"
                      />
                    )}
                  </div>
                </UploadIcon>
                <div className="upload-image-container-title">{t('change_profile_photo')}</div>
              </div>
              <InputFieldV2
                formik={formik}
                prefix={<User />}
                field={{
                  name: 'name',
                  type: 'text',
                  placeholder: 'update your name',
                  label: 'Name',
                  redStar: '*',
                }}
              />
              <InputFieldV2
                formik={formik}
                prefix={<Email />}
                field={{
                  name: 'email',
                  type: 'email',
                  placeholder: 'update your email',
                  label: 'Email',
                  redStar: '*',
                }}
              />
            </div>
          </div>
        </div>
        <div className="password-update-container">
          <PasswordUpdate isReset={false} />
        </div>
      </div>
    </form>
  )
}

export default CredentialUpdate
