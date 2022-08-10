import { graphql } from 'graphql'
import { schema } from '../src/schemas/schema'

export async function makeGraphQLRequest<T>(reviewOrMutation: string, token: string): Promise<T> {
  return await graphql({
    schema,
    source: reviewOrMutation,
    contextValue: {
      authorization: `Bearer ${token}`
    }
  }) as unknown as T
}
