import { Select, SelectProps, Space, Tag } from 'antd'

export default function SelectComp({ touched, error, value, setValue, userRoles }: any) {
  const options: { label: string; value: string; index: number }[] = []
  const uniqueRoleName: string[] = []

  userRoles?.map((el: any, index: number) => {
    if (!uniqueRoleName.includes(el.name)) {
      options.push({
        label: `${el.name}`,
        value: `${el._id}`,
        index: index,
      })
    }
  })

  const selectProps: SelectProps<string[]> = {
    mode: 'multiple',
    size: 'large',
    style: { width: '100%' },
    value,
    onChange: (newValue: string[]) => {
      setValue(newValue)
    },
    placeholder: 'Select Roles...',
    maxTagCount: 3,
    autoClearSearchValue: false,
  }

  return (
    <div className="modal-field">
      <label className="modal-field-label">User Role</label>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select {...selectProps}>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <Tag color={getColorForIndex(option.index)}>{option?.label}</Tag>
            </Select.Option>
          ))}
        </Select>
      </Space>
      {touched && error ? <p className="error-message">{error}</p> : null}
    </div>
  )
}

function getColorForIndex(index: number): string {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]
  return colors[index % colors.length]
}
