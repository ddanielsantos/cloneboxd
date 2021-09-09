import express from 'express';
import { insertMovies } from '../controllers/movies/insertMovies';
import { getPerson } from '../controllers/person/requestPerson';
import { getMovies } from '../controllers/movies/requestMovies';
import { getRoles } from '../controllers/roles/requestRoles';
import { auth } from '../controllers/user/authUser';
import { createUser } from '../controllers/user/createUser';

const router = express.Router();

router.get('/', (req, res)=>{
    return res.send(`Home`)
})

// Estou ciente que as rotas não estão bem organizadas, 
// porém a prioridade para que elas sejam padronizadas 
// e separadas em categorias e camadas não é a maior agora

router.post('/join', createUser)
router.post('/login', auth)
router.get('/movies', getMovies)
router.get('/roles', getRoles)
router.get('/persons', getPerson)

router.post('/movies', insertMovies)
export { router }