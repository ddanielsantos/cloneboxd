import { Router } from 'express'
// import { authMiddleware } from '../../middlewares/auth'
import { requestRoles } from './requestRoles'

const roleController = Router()

roleController.get('/', requestRoles)
// roleController.post('/', authMiddleware, createRole)

export { roleController }
