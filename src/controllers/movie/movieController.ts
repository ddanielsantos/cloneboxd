import { Router } from 'express'
import { createMovie } from './createMovie'
import { requestMovies } from './requestMovies'
import authMiddleware from '@middlewares/authMiddleware'
import { deleteMovie } from './deleteMovie'
import { updateMovie } from './updateMovie'

const movieController = Router()

movieController.get('/', requestMovies)
movieController.post('/', authMiddleware, createMovie)
movieController.delete('/:movieId', authMiddleware, deleteMovie)
movieController.patch('/', authMiddleware, updateMovie)

export { movieController }
