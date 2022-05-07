import { RequestParameters } from 'relay-runtime'

import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import fetchGraphQL from './fetchGraphQL'

async function fetchRelay(params: RequestParameters, variables: {}) {
  return fetchGraphQL(params.text || '', variables)
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource())
})