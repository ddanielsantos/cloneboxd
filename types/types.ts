interface Person {
  name: string
  gender: string
  bornAt: string
  nationality: string
  bio: string
  role: number
}

interface Movie {
  title: string
  duration: string
  year: number
  origin: string
}

interface Role {
  name: string
}

interface User {
  email: string
  password: string
}

export { Person, Movie, Role, User }
