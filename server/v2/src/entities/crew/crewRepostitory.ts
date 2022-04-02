import { repositoryFactory } from '../../factories/repository'

type Crew = {
  id: string,
  name: string,
  nacionality: string,
  dateOfBirth: string
}

const crewRepository = repositoryFactory<Crew>('crew')

export { crewRepository }
