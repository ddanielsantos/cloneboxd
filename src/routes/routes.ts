import express from 'express'
import { createMovie } from '../controllers/movies/createMovie'
import { getPerson } from '../controllers/person/requestPersons'
import { getMovie } from '../controllers/movies/requestMovies'
import { getRoles } from '../controllers/roles/requestRoles'
import { auth } from '../controllers/user/authUser'
import { createUser } from '../controllers/user/createUser'
import { auth as authMiddleware } from '../middlewares/auth'

const router = express.Router()

router.get('/', (_req, res) => res.send('home'))

router.post('/join', createUser)
router.post('/login', auth)
router.get('/movies', getMovie)
router.get('/roles', getRoles)
router.get('/persons', getPerson)

router.post('/movies', authMiddleware, createMovie)

export { router }
