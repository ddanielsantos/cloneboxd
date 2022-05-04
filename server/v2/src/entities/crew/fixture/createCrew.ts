import { WithId } from 'mongodb'
import { Crew, crewRepository } from '../crewRepository'

export async function createCrew(): Promise<WithId<Crew>> {
  const [crewMember] = await crewRepository.findByProperty({
    name: 'a long one just to make sure that it is unique'
  })

  if (crewMember) return crewMember

  const dummyCrewMember = {
    name: 'a long one just to make sure that it is unique',
    nacionality: 'USA',
    dateOfBirth: '1981-03-11'
  }

  const { insertedId } = await crewRepository.insertOne(dummyCrewMember)

  return {
    ...dummyCrewMember,
    _id: insertedId
  }
}
