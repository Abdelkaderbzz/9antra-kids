import { Spin } from 'antd'
import { HTMLAttributes, ReactNode } from 'react'

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: string
  label?: string
  variant?:
    | 'primary'
    | 'info'
    | 'success'
    | 'danger'
    | 'warning'
    | 'dark'
    | 'secondary'
    | 'light'
    | 'cancel'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  outlined?: boolean
  type?: 'button' | 'submit' | 'reset'
  rounded?: boolean
  disabled?: boolean
  children?: ReactNode
  refs?: any
  isLoading?: boolean
}

const Button: React.FC<IButtonProps> = ({
  icon,
  label,
  variant,
  size,
  outlined,
  rounded,
  disabled,
  type,
  children,
  refs,
  isLoading,
  ...props
}) => {
  return (
    <button
      type={type}
      ref={refs}
      className={[
        'btn',
        `btn-${size}`,
        `${outlined ? 'btn-outlined' : 'btn'}-${variant}`,
        `${rounded ? 'btn-rounded' : ''}`,
        `${disabled ? 'btn-disabled' : ''}`,
      ].join(' ')}
      disabled={disabled || isLoading}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {isLoading == false || !isLoading ? (
            <>
              {icon && <img src={icon} alt="icon" className="icon" />}
              {label}
            </>
          ) : (
            <Spin size="small" style={{ fontSize: '8px', display: 'flex', gap: '10px' }}></Spin>
          )}
        </>
      )}
    </button>
  )
}

type ButtonDefaultProps = Pick<
  IButtonProps,
  'icon' | 'label' | 'variant' | 'size' | 'outlined' | 'rounded' | 'disabled' | 'children'
>

Button.defaultProps = {
  icon: '',
  label: 'Button',
  variant: 'primary',
  size: 'md',
  outlined: false,
  rounded: false,
  disabled: false,
  children: null,
} as ButtonDefaultProps

export default Button
