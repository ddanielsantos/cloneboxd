interface codeAndMessage {
  code: string | number
  message: string
}

export const databaseErrorList: codeAndMessage[] = [
  { code: '42703', message: 'an unknown property has been sent' },
  { code: '23502', message: 'a mandatory property was not sent' },
  { code: '22P02', message: 'a property was submitted with the wrong type.' },
  { code: '23505', message: 'one of the submitted properties is unique and has already been provided' }
]
