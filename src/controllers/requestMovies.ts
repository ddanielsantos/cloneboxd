import { Request, Response } from "express";
import { genericQuery } from "./genericQuery";

const getMovies = async(req: Request, res: Response) =>{
    return res.send(await genericQuery('movie'))
}

export { getMovies }