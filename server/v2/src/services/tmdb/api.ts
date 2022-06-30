import axios from 'axios'
import { getEnvironmentVariables } from '../../config/env'

const { TMDB_API_KEY } = getEnvironmentVariables()

export const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: TMDB_API_KEY!
  }
})
