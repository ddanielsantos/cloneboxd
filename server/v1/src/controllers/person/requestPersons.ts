import { Request, Response } from 'express'
import PersonRepository from 'repositories/PersonRepository'

const requestPersons = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send(await PersonRepository.findAll())
}

export { requestPersons }
