import {
  sendResult,
  renderGraphiQL,
  processRequest,
  shouldRenderGraphiQL,
  getGraphQLParameters
} from 'graphql-helix'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { schema } from './src/schemas/schema'

const app = new Koa()

app.use(bodyParser())
app.use(cors())

app.use(async (ctx) => {
  const request = {
    body: ctx.request.body,
    headers: ctx.request.headers,
    method: ctx.request.method,
    query: ctx.request.query
  }

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({})
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request)

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => ctx.req.headers
    })

    ctx.respond = false
    sendResult(result, ctx.res)
  }
})

export default app
