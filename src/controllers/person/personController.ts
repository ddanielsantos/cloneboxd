import { Router } from 'express'
import { requestPersons } from './requestPersons'

const personController = Router()

personController.get('/', requestPersons)

export { personController }
