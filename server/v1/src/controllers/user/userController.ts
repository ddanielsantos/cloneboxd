import { Router } from 'express'
import { authUser } from './authUser'
import { createUser } from './createUser'

const userController = Router()

userController.post('/join', createUser)
userController.post('/auth', authUser)

export { userController }
