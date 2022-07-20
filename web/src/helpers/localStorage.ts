export type Token = {
  accessToken: string | null
  refreshToken: {
    refreshToken: string | null
    // TODO: maybe add a alert message to login again idk
    expiresIn: string | null
  } | null
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

export function getToken(): string | undefined {
  const data = sessionStorage.getItem('@cloneboxd:token')

  if (data) {
    const token: Token = JSON.parse(data)

    return token.accessToken!
  }
}

export function removeToken() {
  sessionStorage.removeItem('@cloneboxd:token')
}
