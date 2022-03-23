import Router from "koa-router"
import { movie } from "./movie"

const router = new Router()

router.use('api/movie', movie.routes())
router.use('api/movie', movie.allowedMethods())

router.get('/api/movie', async (ctx, _body) => {
  ctx.body = 'testing some stuff'
})

export { router }
