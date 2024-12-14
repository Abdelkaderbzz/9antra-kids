import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RcFile } from 'antd/lib/upload/interface'
import Message from '../components/Message'
import DragAndDrop from '../components/DragAndDrop'
import { ReactComponent as IconDragAndDrop } from '@src/assets/icons/reports/iconDragAndDrop.svg'
import { ReactComponent as IconDescription } from '@src/assets/icons/reports/iconDescription.svg'
import { ReactComponent as IconEmail } from '@src/assets/icons/reports/iconEmail.svg'
import { ReactComponent as IconBtnSend } from '@src/assets/icons/reports/iconBtnSend.svg'
import { createReports } from '@src/store/slices/Reports/reportsThunk'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import { getTextDirection } from '@src/utils/checkArabicLanguage'

const Reports = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state: RootState) => state.reports)
  const [uploadedImage, setUploadedImage] = useState<RcFile | null>(null)
  const initialValues = {
    emailOrPhone: '',
    description: '',
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const phoneRegex = /^(\+216)?[24579][0-9]{7}$/
  const validationSchema = Yup.object({
    emailOrPhone: Yup.string()
      .test('is-email-or-phone', 'Invalid email or phone format.', (value: string | undefined) => {
        if (!value) {
          return true
        }
        return emailRegex.test(value) || phoneRegex.test(value)
      })
      .required('Email or Phone cannot be empty.'),
    description: Yup.string()
      .required('description cannot be empty')
      .min(6, 'description must have at least 6 characters.'),
  })
  const handleSubmit = async () => {
    dispatch(createReports({ ...formik.values, uploadedImage }))
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  })
  useEffect(() => {
    if (status === 'succeeded') {
      formik.resetForm()
      setUploadedImage(null)
    }
  }, [status])

  const direction = getTextDirection(formik.values.description)
  return (
    <form className="reports-container-form" onSubmit={formik.handleSubmit}>
      <DragAndDrop
        icon={<IconDragAndDrop />}
        desc="Drop Down image of the Bug"
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />
      <div className="reports-form-description">
        <div>
          <label
            className={`reports-form-description-icon ${
              formik.values.description ? 'textarea-focused' : ''
            }`}
            htmlFor="description"
          >
            <IconDescription />
            <p> Add description</p>
          </label>
          <textarea
            id="description"
            {...formik.getFieldProps('description')}
            style={{ direction }}
          />
        </div>
        {formik.errors.description && formik.touched.description ? (
          <Message text={formik.errors.description} status="error" />
        ) : null}
      </div>
      <div className="reports-form-email">
        <div>
          <label className="reports-form-email-icon" htmlFor="email">
            <IconEmail />
          </label>
          <input
            type="text"
            placeholder="Your Email or phone number"
            id="emailOrPhone"
            {...formik.getFieldProps('emailOrPhone')}
          />
        </div>
        {formik.errors.emailOrPhone && formik.touched.emailOrPhone ? (
          <Message text={formik.errors.emailOrPhone} status="error" />
        ) : null}
      </div>
      <button type="submit" className="reports-form-btn" disabled={status === 'loading'}>
        {status === 'loading' ? (
          'Loading...'
        ) : (
          <>
            <IconBtnSend /> Send
          </>
        )}
      </button>
    </form>
  )
}

export default Reports
