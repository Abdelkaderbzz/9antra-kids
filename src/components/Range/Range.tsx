import { Slider } from 'antd'
interface RangeProps {
  label: string
  value: any
  min: number
  max: number
  onChange: any
}
export const Range = ({ label, value, onChange, min, max }: RangeProps) => (
  <div className="range-container">
    <span className="range-label">{label}</span>

    <Slider
      style={{ minWidth: '160px' }}
      min={min}
      max={max}
      onChange={onChange}
      value={value}
      tooltip={{ open: true }}
    />
  </div>
)
