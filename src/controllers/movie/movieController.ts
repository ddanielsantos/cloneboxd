import { Router } from 'express'
import { createMovie } from './createMovie'
import { requestMovies } from './requestMovies'
import authMiddleware from '@middlewares/authMiddleware'
import { deleteMovie } from './deleteMovie'

const movieController = Router()

movieController.get('/', requestMovies)
movieController.post('/', authMiddleware, createMovie)
movieController.delete('/:movieId', authMiddleware, deleteMovie)

export { movieController }
