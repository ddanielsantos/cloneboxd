export function saveToken(token: string) {
  try {
    localStorage.setItem('token', token)
    return {
      error: null
    }
  } catch {
    return {
      error: 'Could not save token',
    }
  }
}

export function getToken() {
  return localStorage.getItem('token')
}

export function removeToken() {
  localStorage.removeItem('token')
}
