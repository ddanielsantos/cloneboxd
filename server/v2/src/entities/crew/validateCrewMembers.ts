import mongoose from 'mongoose'
import { CrewModel } from './crewModel'
import { fromGlobalId } from 'graphql-relay'

const INVALID_CREW_MEMBER = 'Some invalid crew member id was provided'

export async function validateCrewMembers(ids: string[]) {
  const mongoIds = new Set<string>()

  ids.forEach(id => {
    const mongoId = fromGlobalId(id).id
    mongoIds.add(mongoId)
  })

  const isInvalid = (element: string) => {
    return !mongoose.Types.ObjectId.isValid(element)
  }

  for (const item of mongoIds) {
    if (isInvalid(item)) {
      return {
        error: INVALID_CREW_MEMBER
      }
    }
  }

  const crewMembers = await CrewModel.find({ _id: { $in: [...mongoIds] } })

  if (crewMembers.length !== mongoIds.size) {
    return {
      error: INVALID_CREW_MEMBER
    }
  }

  return {
    error: null
  }
}
