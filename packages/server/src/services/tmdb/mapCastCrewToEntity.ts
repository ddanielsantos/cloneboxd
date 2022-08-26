type Person = {
  job?: string
  character?: string
  id: number
  name: string
}

export const mapCastCrewToEntity = (actor: Person) => {
  return {
    role: actor.job ?? actor.character,
    person: {
      id: actor.id,
      name: actor.name
    }
  }
}
