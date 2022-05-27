import { CrewModel } from '../crewModel'

export async function createCrew() {
  const crewMember = await CrewModel.findOne({
    name: 'a long one just to make sure that it is unique'
  })

  if (crewMember) return crewMember

  const document = new CrewModel({
    name: 'a long one just to make sure that it is unique',
    dateOfBirth: '1981-03-11'
  })

  await document.save()

  return document
}
