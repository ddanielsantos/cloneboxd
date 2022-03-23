import { CustomResponse } from 'adapters/ExpressRouterAdapter'
import MovieRepository from 'repositories/MovieRepository'

class RequestMoviesRouter {
  async route (_httpRequest: any): Promise<CustomResponse> {
    try {
      const movies = await MovieRepository.findAll()
      return {
        statusCode: 200,
        body: movies
      }
    } catch {
      return {
        statusCode: 500,
        body: {
          error: 'somenthing went wrong'
        }
      }
    }
  }
}

export { RequestMoviesRouter }
