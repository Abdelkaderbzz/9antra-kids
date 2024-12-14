import { Select, SelectProps } from 'antd'

const CustomSelect: React.FC<SelectProps> = ({ ...props }) => {
  return <Select {...props} options={props.options} />
}

export default CustomSelect
