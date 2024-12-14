import jwtDecode from 'jwt-decode'
import { message } from 'antd'
export const isValidToken = (token: string) => {
  try {
    const decoded: any = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp > currentTime
  } catch (error) {
    return false
  }
}
export const handleCopy = (value: string, label: string) => {
  if (value) {
    navigator.clipboard.writeText(value)
    message.success(`${label} copied successfully`)
  }
}
export const rgbToHex = (rgb: string | undefined) => {
  const rgbValues: any = rgb?.match(/\d+/g)
  let hexValues = rgbValues.map((value: any) => {
    const hex = parseInt(value).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  })
  const hexColor = '#' + hexValues.join('')

  return hexColor
}
