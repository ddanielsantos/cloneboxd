import express from 'express';
import { insertMovies } from '../controllers/insertMovies';
import { getPerson } from '../controllers/requestPerson';
import { getMovies } from '../controllers/requestMovies';
import { getRoles } from '../controllers/requestRoles';
const router = express.Router();

router.get('/', (req, res)=>{
    return res.send(`Home`)
})

router.get('/movies', getMovies)
router.get('/roles', getRoles)
router.get('/persons', getPerson)

router.post('/movies', insertMovies)
export { router }