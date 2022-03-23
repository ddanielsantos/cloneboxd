import { Router } from 'express'
import { requestRoles } from './requestRoles'

const roleController = Router()

roleController.get('/', requestRoles)

export { roleController }
