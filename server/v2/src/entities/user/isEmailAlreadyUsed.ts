import { userRepository } from './userRepository'

export async function isEmailAlreadyUsed(email: string): Promise<boolean> {
  const queryResponse = await userRepository.findByProperty({ email })

  return !!queryResponse[0]
}
