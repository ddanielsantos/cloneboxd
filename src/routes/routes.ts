import express from 'express';
const router = express.Router();
const app = express()

router.get('/', (req, res)=>{
    return res.send(`Home`)
})



export { router }