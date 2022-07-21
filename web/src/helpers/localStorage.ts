export type Token = {
  accessToken: string | null
  refreshToken: {
    value: string | null
    // TODO: maybe add a alert message to login again idk
    expiresIn: string | null
  } | null
}

export function saveToken(token: Token) {
  try {
    localStorage.setItem('@cloneboxd:token', JSON.stringify(token))
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
  const data = localStorage.getItem('@cloneboxd:token')

  if (data) {
    const token: Token = JSON.parse(data)

    return token.accessToken!
  }
}

export function removeToken() {
  localStorage.removeItem('@cloneboxd:token')
}
