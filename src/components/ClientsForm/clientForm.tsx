import { RootState, useAppDispatch } from '@store/index'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toggleCrudForm } from '@src/store/slices/sittingSlice/sittingSlice'
import Button from '@src/components/Button/Button'
import InputField from '../InputField/InputField'
import ModalV1 from '../ModalV1/ModalV1'
import { useTranslation } from 'react-i18next'

const ClientForm = () => {
  const { t } = useTranslation('modal')
  const { t: tValidation } = useTranslation('validation')
  const { isCrudFormOpened } = useSelector((state: RootState) => state.sitting)

  const initialValues = {
    fullName: '',
    description: '',
    location: '',
    phoneNum: '',
    email: '',
    tags: [],
    installment: '',
    paymentDay: '',
  }

  const validationSchema = Yup.object({
    fullName: Yup.string().required(tValidation('required')),
    email: Yup.string().email(tValidation('invalid_email')).required(tValidation('required')),
    phoneNum: Yup.string().required(tValidation('required')),
    location: Yup.string().required(tValidation('required')),
    installment: Yup.number().required(tValidation('required')),
    paymentDay: Yup.date().required(tValidation('required')),
  })

  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <ModalV1
      title={<p className="org_users_modal_creation_title">{t('create_client')}</p>}
      onCancel={() => {
        dispatch(toggleCrudForm())
      }}
      footer={<></>}
      open={isCrudFormOpened}
    >
      <form className="crud-form-popup" onSubmit={formik.handleSubmit}>
        <InputField
          formik={formik}
          field={{
            name: 'fullName',
            type: 'text',
            placeholder: t('enter_client_name'),
            label: t('name'),
            class: 'crud-form-field',
            redStar: '*',
          }}
        />
        <InputField
          formik={formik}
          field={{
            name: 'email',
            type: 'email',
            placeholder: t('enter_email_address'),
            label: t('email'),
            redStar: '*',
            class: 'crud-form-field',
          }}
        />
        <InputField
          formik={formik}
          field={{
            name: 'phoneNum',
            type: 'text',
            placeholder: t('enter_phone_number'),
            label: t('phone_number'),
            redStar: '*',
            class: 'crud-form-field',
          }}
        />
        <InputField
          formik={formik}
          field={{
            name: 'location',
            type: 'text',
            placeholder: t('enter_location'),
            label: t('location'),
            redStar: '*',
            class: 'crud-form-field',
          }}
        />
        <InputField
          formik={formik}
          field={{
            name: 'description',
            type: 'text',
            placeholder: t('enter_description'),
            label: t('description'),
            class: 'crud-form-field',
          }}
        />
        <InputField
          formik={formik}
          field={{
            name: 'tags',
            type: 'text',
            placeholder: t('enter_tags'),
            label: t('tags'),
            class: 'crud-form-field',
          }}
        />
        <InputField
          formik={formik}
          field={{
            name: 'installment',
            type: 'number',
            placeholder: t('enter_installment'),
            label: t('installment'),
            redStar: '*',
            class: 'crud-form-field',
          }}
        />
        <InputField
          formik={formik}
          field={{
            name: 'paymentDay',
            type: 'date',
            placeholder: t('enter_payment_day'),
            label: t('payment_day'),
            redStar: '*',
            class: 'crud-form-field',
          }}
        />

        <div className="form_submit_section">
          <Button variant="cancel" type="reset" onClick={formik.handleReset}>
            reset
          </Button>
          <Button type="submit">submit</Button>
        </div>
      </form>
    </ModalV1>
  )
}

export default ClientForm
