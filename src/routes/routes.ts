import express from 'express';
import { getMovies } from '../controllers/requestMovies';
const router = express.Router();
const app = express()

router.get('/', (req, res)=>{
    return res.send(`Home`)
})

router.get('/movies', getMovies)

export { router }