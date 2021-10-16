import { Request, Response } from 'express'
import RoleRepository from 'repositories/RoleRepository'

const requestRoles = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(await RoleRepository.findAll())
}

export { requestRoles }
