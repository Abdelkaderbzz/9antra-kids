// LabeledTextAreaInput.tsx
import React from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input'

const { TextArea } = Input

interface LabeledTextAreaProps extends TextAreaProps {
  label: string
  value?: string
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  maxLength?: number
  disabled?: boolean
  readOnly?: boolean
  labelCol?: { span: number }
  wrapperCol?: { span: number }
}

const TextAreaInput: React.FC<LabeledTextAreaProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  placeholder,
  rows,
  maxLength,
  disabled,
  readOnly,
  labelCol,
  wrapperCol,
  ...props
}) => {
  return (
    <div className="textarea_input">
      <div className="textarea_input_label">{label}</div>
      <TextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    </div>
  )
}

export default TextAreaInput
