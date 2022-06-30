import { movieCreate } from './movieCreate'
import { movieDelete } from './movieDelete'
import { movieUpdate } from './movieUpdate'

// TODO: remove person and movie mutations, the data related about
// them will come from TMDB only
export const movieMutations = {
  movieCreate,
  movieDelete,
  movieUpdate
}
