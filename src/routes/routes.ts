import express from 'express'
import { movieController } from '@movie/movieController'
import { personController } from '@person/personController'
import { roleController } from '@role/roleController'
import { userController } from '@user/userController'

const router = express.Router()

router.get('/', (_req, res) => res.send('home'))

router.use('/user', userController)
router.use('/movie', movieController)
router.use('/role', roleController)
router.use('/person', personController)

export { router }
