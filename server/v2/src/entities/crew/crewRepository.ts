import { repositoryFactory } from '../../factories/repository'

type Crew = {
  name: string,
  nacionality: string,
  dateOfBirth: string
}

const crewRepository = repositoryFactory<Crew>('crew')

export { crewRepository }
