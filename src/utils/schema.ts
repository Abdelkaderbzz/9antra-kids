import * as Yup from 'yup'
export const userCreateSchema = Yup.object({
  name: Yup.string()
    .max(45, 'must be 45 characters or less')
    .trim()
    .required('Name is Required')
    .min(3, 'must be more then 3 charaters'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/, 'Invalid email address')
    .test(
      'no-special-chars',
      'Email contains disallowed characters',
      (value: string | undefined) => !value || /^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(value),
    )
    .required('Email is required'),
  password: Yup.string().trim().required('Password is required').min(8, 'Password is too weak!'),
  domain: Yup.string().trim().required('Domain is required'),
})
export const userOrgCreateSchema = Yup.object({
  name: Yup.string()
    .max(45, 'must be 45 characters or less')
    .trim()
    .required('Name is Required')
    .min(3, 'must be more then 3 charaters'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/, 'Invalid email address')
    .test(
      'no-special-chars',
      'Email contains disallowed characters',
      (value: string | undefined) => !value || /^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(value),
    )
    .required('Email is required'),
  password: Yup.string().trim().required('Password is required').min(8, 'Password is too weak!'),
})
export const userUpdateSchema = Yup.object({
  name: Yup.string()
    .max(45, 'must be 45 characters or less')
    .required('Name is Required')

    .min(3, 'must be more then 3 charaters'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/, 'Invalid email address')
    .test(
      'no-special-chars',
      'Email contains disallowed characters',
      (value: string | undefined) => !value || /^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(value),
    )
    .required('Email is required'),
})
