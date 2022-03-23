import { Router } from 'express'
import { createMovie } from './createMovie'
import { RequestMoviesRouter } from './requestMovies'
import authMiddleware from '@middlewares/authMiddleware'
import { deleteMovie } from './deleteMovie'
import { updateMovie } from './updateMovie'
import { ExpressRouterAdapter } from 'adapters/ExpressRouterAdapter'

const movieController = Router()
const request = new RequestMoviesRouter()

movieController.get('/', ExpressRouterAdapter.adapt(request))
movieController.post('/', authMiddleware, createMovie)
movieController.delete('/:movieId', authMiddleware, deleteMovie)
movieController.patch('/', authMiddleware, updateMovie)

export { movieController }
