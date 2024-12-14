export const getTokens = () => {
  return {
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null,
  }
}

export const setTokens = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
