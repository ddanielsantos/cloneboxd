import { Request, Response } from "express";
import { movie } from "../../../types/types";
import { genericInsert } from "../genericInsert";

const insertMovies = async(req: Request, res: Response) =>{
    // console.log(req.body)
    const data: movie = req.body
    
    for(const el in data){
        if(!data[el]) return res.status(500).send("Fill all the fields")
    }

    try{
        await genericInsert('movie', {
            title: data.title,
            duration: data.duration,
            origin: data.origin,
            year: data.year
        })
        return res.send("Movie added")
    }catch{
        return res.status(500).send("An error occurred")
    }
}

export { insertMovies }