/* eslint-disable camelcase */
import axios from 'axios'
import { getEnvironmentVariables } from '../../config/env'

const { TMDB_API_KEY } = getEnvironmentVariables()

const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: TMDB_API_KEY!
  }
})

type DataOrError<T> = { data: T, error: null } | { data: null; error: unknown }

type Result = {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type TitleSearchResponse = {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

type ProductionCompany = {
  id: number
  logo_path: any
  name: string
  origin_country: string
}

type ProductionCountry = {
  iso_3166_1: string
  name: string
}

type Genre = {
  id: number
  name: string
}

type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

type MovieResponse = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type TMDBCast = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number
}[]

type TMDBCrew = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: any
  credit_id: string
  department: string
  job: string
}[]

type CreditsResponse = {
  cast: TMDBCast
  crew: TMDBCrew
}

export async function searchMovieByTitle(query: string): Promise<DataOrError<TitleSearchResponse>> {
  const formattedQuery = query.replace(/\s/g, '%')

  try {
    const url = `search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${formattedQuery}&page=1&include_adult=false`
    const { data } = await tmdbAPI.get(url)

    return { data, error: null }
  } catch (e) {
    return { data: null, error: e }
  }
}

export async function searchMovieById(movieId: string): Promise<DataOrError<MovieResponse>> {
  try {
    const url = `movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
    const { data } = await tmdbAPI.get(url)

    return { data, error: null }
  } catch (e) {
    return { data: null, error: e }
  }
}

export async function searchMovieCredits(movieId: string): Promise<DataOrError<CreditsResponse>> {
  try {
    const url = `movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    const { data } = await tmdbAPI.get(url)

    return { data, error: null }
  } catch (e) {
    return { data: null, error: e }
  }
}
