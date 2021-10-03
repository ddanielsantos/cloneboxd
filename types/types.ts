interface Person {
  id?: number
  name: string
  gender: string
  bornAt: string
  nationality: string
  bio: string
}

interface Movie {
  id?: number
  title: string
  duration: string
  year: number
  origin: string
}

interface Role {
  id?: number
  name: string
}

interface User {
  id?: number
  admin: boolean
  email: string
  password: string
  uuid?: string
}

export { Person, Movie, Role, User }
