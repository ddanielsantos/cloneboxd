import { Router } from 'express'
import { createMovie } from './createMovie'
import { requestMovies } from './requestMovies'
import { authMiddleware } from '../../middlewares/authMiddleware'

const movieController = Router()

movieController.get('/', requestMovies)
movieController.post('/', authMiddleware, createMovie)

export { movieController }
