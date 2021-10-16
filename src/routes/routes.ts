import express from 'express'
import { movieController } from '@controllers/movie/movieController'
import { personController } from '@controllers/person/personController'
import { roleController } from '@controllers/role/roleController'
import { userController } from '@controllers/user/userController'

const router = express.Router()

router.get('/', (_req, res) => res.send('home'))

router.use('/user', userController)
router.use('/movie', movieController)
router.use('/role', roleController)
router.use('/person', personController)

export { router }
