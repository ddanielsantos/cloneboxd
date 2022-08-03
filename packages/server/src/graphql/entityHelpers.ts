import { GraphQLObjectType } from 'graphql'

type Entity = {
  type: GraphQLObjectType,
  nodeResolver: (id: string) => Promise<any>
}

type EntityMap = {
  [key: string]: Entity
}

const entities: EntityMap = {}

export function entityRegister(newEntity: Entity) {
  entities[newEntity.type.name] = newEntity
}

export async function resolveNode(type: string, id: string) {
  return await entities[type]?.nodeResolver(id)
}

export async function resolveType(obj: any): Promise<string> {
  if (!obj.id) {
    return ''
  }

  const keys = Object.keys(entities)
  const promises = keys.map(key => {
    return entities[key].nodeResolver(obj.id)
  })
  const result = await Promise.allSettled(promises)
  const index = result.findIndex((v: any) => v.value)

  if (index === -1) {
    return ''
  }

  return keys[index]
}
