import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { Knex } from 'knex'
import { user } from '../../../types/types'

const knex = require("../../../knex/knex") as Knex

const auth = async(req: Request, res: Response) => {
    const credentials: user = req.body
    const result = await knex('system-user').select().where("email", credentials.email)

    if (result.length < 1) {
        return res.status(401).send("E-mail didn't match")
    }

    try{
        
        const comp = await bcrypt.compare(credentials.password, result[0].password)
        return res.send(comp)

    }catch{
        return res.status(401).send("Wrong password")
    }

}

export { auth }