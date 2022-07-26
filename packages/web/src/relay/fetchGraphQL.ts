import { getToken } from '../helpers/localStorage'

async function fetchGraphQL (text: string, variables: {}) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/'

  const authorization = `Bearer ${getToken()}`

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization
    },
    body: JSON.stringify({
      query: text,
      variables
    })
  })

  return await response.json()
}

export default fetchGraphQL
