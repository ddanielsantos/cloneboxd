import {
  sendResult,
  renderGraphiQL,
  processRequest,
  shouldRenderGraphiQL,
  getGraphQLParameters
} from 'graphql-helix'
import Koa from 'koa'
import { ExecutionResult, GraphQLError } from 'graphql'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { schema } from './src/schemas/schema'
import { getUser } from './src/auth/getUser'

const app = new Koa()

app.use(bodyParser())
app.use(cors())

const formatResult = ({ data, errors }: ExecutionResult) => {
  const formatedResult: ExecutionResult = {
    data
  }

  if (errors) {
    formatedResult.errors = errors.map(error => {
      // TODO: change for some logger
      console.error(error)

      return new GraphQLError(error.message, { ...error })
    })
  }

  return formatedResult
}

app.use(async (ctx) => {
  const user = await getUser(ctx)
  ctx.user = user

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
      contextFactory: () => {
        return {
          ...ctx.req.headers,
          user: ctx.user
        }
      }
    })

    ctx.respond = false
    sendResult(result, ctx.res, formatResult)
  }
})

export default app
