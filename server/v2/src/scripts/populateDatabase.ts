import { faker } from '@faker-js/faker'
import { UserModel } from '../entities/user/userModel'

async function populateUserCollection(quantity: number) {
  for (let x = 0; x < quantity; x++) {
    const document = new UserModel({
      fullName: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(20),
      isAdmin: false
    })

    await document.save()
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
    case 'user': {
      await populateUserCollection(5)
      break
    }

    default: {
      console.log(`Invalid argument to '--collection' flag`)
    }
  }
}

execute()
  .then(() => process.exit(0))
