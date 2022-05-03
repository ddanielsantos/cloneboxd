import { crewRepository } from './crewRepository'

export async function validateCrewMembers(ids: string[]) {
  try {
    await crewRepository.findMany(ids)

    return {
      error: null
    }
  } catch {
    return {
      error: 'Invalid actors or directors'
    }
  }
}
