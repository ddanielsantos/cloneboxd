import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { AuthRequired } from './AuthRequired'
import { Review } from '../pages/Review/Review'
import { SignUp } from '../pages/SignUp/SignUp'
import { NoMatch } from '../pages/NoMatch/NoMatch'
import { Routes as RRoutes, Route } from 'react-router-dom'
import { SearchMovieFromTMDB } from '../pages/SearchMovieFromTMDB/SearchMovieFromTMDB'
import { MovieDetails } from '../pages/MovieDetails/MovieDetails'

export const Routes = () => {
  return (
    <RRoutes>
      <Route
        path="/"
        element={
          <AuthRequired>
            <Home />
          </AuthRequired>
        }
      />
      <Route
        path="/review"
        element={
          <AuthRequired>
            <Review />
          </AuthRequired>
        }
      />
      <Route
        path="/search-movie"
        element={
          <AuthRequired>
            <SearchMovieFromTMDB searchQueryRef={{}} />
          </AuthRequired>
        }
      />
      <Route
        path="/movie"
      >
        <Route path=":movieId" element={<MovieDetails />} />
      </Route>
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NoMatch />} />
    </RRoutes >
  )
}