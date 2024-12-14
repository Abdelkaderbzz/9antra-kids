import { isValidToken } from '@src/helpers/helpersFunc'
export const isTokenOfClientValid = () => {
  const clientToken = window.localStorage.getItem('tokenOfClient')
  if (!clientToken) {
    return false
  } else if (!isValidToken(clientToken)) {
    return false
  } else {
    return true
  }
}
