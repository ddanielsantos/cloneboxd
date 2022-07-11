import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { AuthRequired } from './AuthRequired'
import { NewReview } from '../pages/NewReview/NewReview'
import { SignUp } from '../pages/SignUp/SignUp'
import { NoMatch } from '../pages/NoMatch/NoMatch'
import { Routes as RRoutes, Route } from 'react-router-dom'
import { SearchMovieFromTMDB } from '../pages/SearchMovieFromTMDB/SearchMovieFromTMDB'
import { MovieDetails } from '../pages/MovieDetails/MovieDetails'
import { Box } from '@chakra-ui/react'

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
        path="review"
      >
        <Route
          // path={'new'}
          index={true}
          element={
            <AuthRequired>
              <NewReview />
            </AuthRequired>
          }
        />
        <Route
          path={':id'}
          element={
            <Box>
              ola porr
            </Box>
          }
        />
      </Route>
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