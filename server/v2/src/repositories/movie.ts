import { z } from "zod"
import { repositoryFactory } from "factories/repository"

const collectionName = 'movie'

const genres = z.array(
  z.string()
)

const MovieSchema = z.object({
  title: z.string().min(1),
  genres: genres.min(1)
})

type Movie = z.infer<typeof MovieSchema> & {
  _id?: string
}

const movieFactory = repositoryFactory<Movie>(collectionName)

export { movieFactory, Movie, MovieSchema }