import { isMovie, movieInput } from './runtimeTypeGuards'

interface errorObject {
  error: string
}
export const validateMovie = (data: movieInput): movieInput | errorObject => {
  if (!isMovie(data)) {
    return ({ error: 'a mandatory property was not sent' })
  }

  for (const property in data) {
    if (data[property] === '') {
      return ({ error: 'an invalid empty string was sent' })
    }

    if (data.year === 0) {
      return ({ error: 'an invalid 0 value was sent' })
    }
  }

  const { duration, origin, title, year } = data
  const validMovie = { duration, origin, title, year }

  return validMovie
}
