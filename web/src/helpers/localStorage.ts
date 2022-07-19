export type Token = {
  accessToken: string
  refreshToken: {
    refreshToken: string
    expiresIn: number
  }
}

export function saveToken(token: Token) {
  try {
    sessionStorage.setItem('@cloneboxd:token', JSON.stringify(token))
    return {
      error: null
    }
  } catch {
    return {
      error: 'Could not save token',
    }
  }
}

export function getToken(): Token | undefined {
  const data = sessionStorage.getItem('@cloneboxd:token')

  if (data) {
    return JSON.parse(data)
  }
}

export function removeToken() {
  sessionStorage.removeItem('@cloneboxd:token')
}
