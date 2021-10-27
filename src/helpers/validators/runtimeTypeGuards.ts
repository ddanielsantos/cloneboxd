import { Movie } from '../../../types/types'

type inputted<T> = Omit<T, 'id'>

export type movieInput = inputted<Movie>

const hasProperty = (prop: any): boolean => {
  if (prop === undefined) {
    return false
  } else {
    return true
  }
}

export const isMovie = (data: movieInput): boolean => {
  const hasPropertyResult = [data.title, data.duration, data.origin, data.year].map(hasProperty)

  if (hasPropertyResult.includes(false)) {
    return false
  } else {
    return true
  }
}
