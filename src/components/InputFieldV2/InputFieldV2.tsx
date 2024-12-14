import { Input } from 'antd'
import React, { useState } from 'react'
import { VscEyeClosed, VscEye } from 'react-icons/vsc'

interface IFieldProps {
  name: string
  type: string
  placeholder: string
  label: string
  class?: string
  redStar?: string
}

interface IInputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  formik: any
  disabled?: boolean
  field: IFieldProps
  prefix?: any
}

const InputFieldV2: React.FC<IInputFieldProps> = ({ formik, field, prefix, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={`input-field ${field.class}`}>
      <label htmlFor={field?.name}>
        {field?.label}
        <span>{field?.redStar}</span>
      </label>
      <div className="password-input-container">
        <Input
          id={field?.name}
          prefix={prefix}
          name={field?.name}
          type={field?.type === 'password' ? (showPassword ? 'text' : field?.type) : field?.type}
          placeholder={field?.placeholder}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik?.values[field?.name]}
          className={formik.touched[field?.name] && formik.errors[field?.name] ? 'has-error' : ''}
          style={{
            padding: '10px',
            border: '1px solid #CCD7E0',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '8px',
          }}
          {...props}
        />
        {field?.type === 'password' && formik?.values[field?.name] && (
          <span className="password-toggle" onClick={handlePasswordVisibilityToggle}>
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
        )}
      </div>
      {formik.touched[field?.name] && formik.errors[field?.name] ? (
        <p className="error-message">{formik.errors[field?.name]}</p>
      ) : (
        <p className="error-message"></p>
      )}
    </div>
  )
}

export default InputFieldV2
