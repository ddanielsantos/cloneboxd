import { fromGlobalId, nodeDefinitions } from 'graphql-relay'

import { resolveNode, resolveType } from './entityHelpers'

const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  async globalId => {
    const { id, type } = fromGlobalId(globalId)

    const node = await resolveNode(type, id)

    if (!node) console.log('[unmatched node] -', type, id)

    return node || null
  },
  async obj => {
    const type = await resolveType(obj)

    if (!type) console.log('[unmatched type] - ', obj)

    return type
  }
)

export { nodeField, nodeInterface, nodesField }
