import { Request, Response } from 'express'

export interface CustomResponse {
  statusCode: number
  body: object[] | { error: string }
}

interface BodyOfRequest {
  body: Pick<Request, 'body'>
}

export interface RouteHandler {
  route: (httpRequest: BodyOfRequest) => Promise<CustomResponse>
}

export const ExpressRouterAdapter = {
  adapt: (route: RouteHandler) => {
    return async (req: Request, res: Response): Promise<Response> => {
      const httpRequest: BodyOfRequest = {
        body: req.body
      }
      const httpResponse = await route.route(httpRequest)
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
