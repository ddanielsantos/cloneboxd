type person = {
    name: string,
    gender: string,
    bornAt: string,
    nationality: string,
    bio: string,
    role: number,
}

type movie = {
    title: string,
    duration: string,
    year: number,
    origin: string,
}

type role = {
    name: string,
}

type user = {
    email: string,
    password: string
}

export { person, movie, role, user}