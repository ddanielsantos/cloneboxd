import { faker } from '@faker-js/faker'
import { movieRepository } from '../entities/movie/movieRepository'
import { crewRepository } from '../entities/crew/crewRepository'
import { userRepository } from '../entities/user/userRepository'
import { createUser } from '../entities/user/fixture/createUser'

async function populateMovieCollecion(quantity: number) {
  for (let x = 0; x < quantity; x++) {
    await movieRepository.insertOne({
      title: faker.word.adjective() + ' ' + faker.word.noun(),
      duration: `${faker.mersenne.rand(0, 180)} min`,
      releaseDate: faker.date
        .between(
          '1920-01-01T00:00:00.000Z',
          '2023-01-01T00:00:00.000Z'
        )
        .toISOString()
        .slice(0, 10),
      actors: Array(3)
        .fill('')
        .map(() => faker.name.findName()),
      ageGroup: 'E',
      directors: Array(3)
        .fill('')
        .map(() => faker.name.findName()),
      genres: Array(3)
        .fill('')
        .map(() => faker.word.noun()),
      rating: faker.mersenne
        .rand(0, 5),
      submitedBy: (await createUser())._id
    })
  }
}

async function populateUserCollection(quantity: number) {
  for (let x = 0; x < quantity; x++) {
    await userRepository.insertOne({
      fullName: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(20),
      isAdmin: false
    })
  }
}

async function populateCrewCollection(quantity: number) {
  for (let x = 0; x < quantity; x++) {
    await crewRepository.insertOne({
      name: faker.name.findName(),
      dateOfBirth: faker.date
        .between(
          '1920-01-01T00:00:00.000Z',
          '2023-01-01T00:00:00.000Z'
        )
        .toISOString()
        .slice(0, 10),
      nacionality: faker.address.countryCode('alpha-3')
    })
  }
}

function indexOfFlag(flag: string): number {
  return process.argv.indexOf('--' + flag)
}

async function execute() {
  if (process.argv.length === 2) console.log('You must specify at least one argument')

  const indexOfCollectionFlag = indexOfFlag('collection')

  if (indexOfCollectionFlag === -1) return

  switch (process.argv[indexOfCollectionFlag + 1]) {
    case 'movie': {
      await populateMovieCollecion(50)
      break
    }

    case 'user': {
      await populateUserCollection(5)
      break
    }

    case 'crew': {
      await populateCrewCollection(50)
      break
    }

    default: {
      console.log(`Invalid argument to '--collection' flag`)
    }
  }
}

execute()
  .then(() => process.exit(0))
