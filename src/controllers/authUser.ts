import { Request, Response } from 'express'
import { Knex } from 'knex'
import { user } from '../../types/types'

const knex = require("../../knex/knex") as Knex

const auth = async(req: Request, res: Response) => {
    const credentials: user = req.body
    const result = await knex('system-user').select().where("email", credentials.email)
    
    if(result.length < 0){

    }
}

export { auth }